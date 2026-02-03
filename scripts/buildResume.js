#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const texPath = path.join(projectRoot, 'public', 'Peterson_Guo_Resume.tex');
const outputDir = path.join(projectRoot, 'public');
const outputPdf = path.join(outputDir, 'Peterson_Guo_Resume.pdf');

const publicEmail = process.env.RESUME_PUBLIC_EMAIL || '';
const publicPhone = process.env.RESUME_PUBLIC_PHONE || '';

function buildResume() {
	if (!fs.existsSync(texPath)) {
		throw new Error('Resume TeX not found at ' + texPath);
	}

	// Override contact info if environment variables are set
	let texContent = fs.readFileSync(texPath, 'utf8');
	if (publicEmail) {
		texContent = texContent.replace(
			/\\providecommand{\\ResumeEmail}{[^}]*}/,
			`\\providecommand{\\ResumeEmail}{${publicEmail}}`
		);
	}
	if (publicPhone) {
		texContent = texContent.replace(
			/\\providecommand{\\ResumePhone}{[^}]*}/,
			`\\providecommand{\\ResumePhone}{${publicPhone}}`
		);
	}

	// Write modified content to temp file
	const tempTexPath = path.join(outputDir, 'temp_resume.tex');
	fs.writeFileSync(tempTexPath, texContent);

	try {
		// Compile with pdflatex
		execSync(`pdflatex -output-directory="${outputDir}" -interaction=nonstopmode -jobname=Peterson_Guo_Resume "${tempTexPath}"`, {
			stdio: 'ignore'
		});

		// Clean up temp file and auxiliary files
		fs.unlinkSync(tempTexPath);
		const baseName = 'Peterson_Guo_Resume';
		const auxExtensions = ['.aux', '.log', '.out'];
		auxExtensions.forEach(ext => {
			const auxFile = path.join(outputDir, baseName + ext);
			if (fs.existsSync(auxFile)) {
				fs.unlinkSync(auxFile);
			}
		});

		if (fs.existsSync(outputPdf)) {
			console.log('✓ Generated resume PDF at ' + outputPdf);
		} else {
			throw new Error('PDF was not generated');
		}
	} catch (error) {
		console.error('✗ Error compiling LaTeX:', error.message);
		console.error('Make sure pdflatex is installed (e.g., brew install --cask mactex)');
		process.exit(1);
	}
}

buildResume();
