#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');
const texPath = path.join(projectRoot, 'public', 'Peterson_Guo_Resume.tex');
const outputDir = path.join(projectRoot, 'public');
const outputPdf = path.join(outputDir, 'Peterson_Guo_Resume.pdf');

const publicEmail = process.env.RESUME_PUBLIC_EMAIL || 'peterson.guo@uwaterloo.ca $|$';
const publicPhone = process.env.RESUME_PUBLIC_PHONE || '';

function isLatexAvailable() {
	const checkLatexmk = spawnSync('which', ['latexmk'], { stdio: 'ignore' });
	if (checkLatexmk.status === 0) return true;
	const checkPdflatex = spawnSync('which', ['pdflatex'], { stdio: 'ignore' });
	return checkPdflatex.status === 0;
}

function runLatex(command, args) {
	const result = spawnSync(command, args, { stdio: 'inherit' });
	if (result.error) {
		throw result.error;
	}
	if (result.status !== 0) {
		throw new Error(`${command} failed with exit code ${result.status}`);
	}
}

function buildResume() {
	if (!fs.existsSync(texPath)) {
		throw new Error(`Resume TeX not found at ${texPath}`);
	}

	// Check if LaTeX is available
	if (!isLatexAvailable()) {
		if (process.env.VERCEL || process.env.CI) {
			console.log('⚠ LaTeX not available in CI/Vercel, skipping PDF generation');
			return;
		}
		throw new Error('LaTeX (latexmk or pdflatex) not found in PATH. Install LaTeX to build the resume.');
	}

	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'resume-'));
	try {
		const wrapperPath = path.join(tempDir, 'resume_build.tex');
		const wrapperContent = `\\def\\ResumeEmail{${publicEmail}}\n` +
			`\\def\\ResumePhone{${publicPhone}}\n` +
			`\\input{${texPath}}\n`;

		fs.writeFileSync(wrapperPath, wrapperContent);

	// Try latexmk first, then pdflatex as a fallback
	const latexmkArgs = [
		'-pdf',
		'-interaction=nonstopmode',
		'-halt-on-error',
		`-outdir=${tempDir}`,
		'-jobname=Peterson_Guo_Resume',
		wrapperPath,
	];

	const pdflatexArgs = [
		'-interaction=nonstopmode',
		'-halt-on-error',
		`-output-directory=${tempDir}`,
		'-jobname=Peterson_Guo_Resume',
		wrapperPath,
	];

		try {
			runLatex('latexmk', latexmkArgs);
		} catch (error) {
			// If latexmk fails, try pdflatex
			runLatex('pdflatex', pdflatexArgs);
		}

		const tempPdf = path.join(tempDir, 'Peterson_Guo_Resume.pdf');
		if (!fs.existsSync(tempPdf)) {
			throw new Error(`Expected PDF not found at ${tempPdf}`);
		}

		fs.copyFileSync(tempPdf, outputPdf);

		console.log(`✓ Generated resume PDF at ${outputPdf}`);
	} finally {
		fs.rmSync(tempDir, { recursive: true, force: true });
	}
}

try {
	buildResume();
} catch (error) {
	console.error('✗ Error building resume PDF:', error.message);
	process.exit(1);
}
