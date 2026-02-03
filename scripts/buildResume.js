#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const projectRoot = path.join(__dirname, '..');
const texPath = path.join(projectRoot, 'public', 'Peterson_Guo_Resume.tex');
const outputDir = path.join(projectRoot, 'public');
const outputPdf = path.join(outputDir, 'Peterson_Guo_Resume.pdf');

const publicEmail = process.env.RESUME_PUBLIC_EMAIL || 'peterson.guo@uwaterloo.ca $|$';
const publicPhone = process.env.RESUME_PUBLIC_PHONE || '';

function compileTexWithApi(texContent) {
	return new Promise((resolve, reject) => {
		const url = 'https://texapi.ovh/compile';

		const texWithContact = `\\def\\ResumeEmail{${publicEmail}}\n` +
			`\\def\\ResumePhone{${publicPhone}}\n` +
			texContent;

		const postData = texWithContact;

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain',
				'Content-Length': Buffer.byteLength(postData)
			},
			timeout: 90000
		};

		const req = https.request(url, options, (res) => {
			let data = Buffer.alloc(0);

			res.on('data', (chunk) => {
				data = Buffer.concat([data, chunk]);
			});

			res.on('end', () => {
				if (res.statusCode === 200 && data.length > 0) {
					// texapi.ovh returns PDF directly
					fs.writeFileSync(outputPdf, data);
					resolve(true);
				} else {
					reject(new Error(`API returned status ${res.statusCode}`));
				}
			});
		});

		req.on('error', reject);
		req.on('timeout', () => {
			req.destroy();
			reject(new Error('API request timeout'));
		});

		req.write(postData);
		req.end();
	});
}

async function buildResume() {
	if (!fs.existsSync(texPath)) {
		throw new Error('Resume TeX not found at ' + texPath);
	}

	const texContent = fs.readFileSync(texPath, 'utf8');

	try {
		await compileTexWithApi(texContent);
		console.log('✓ Generated resume PDF at ' + outputPdf);
	} catch (error) {
		console.error('⚠ API compilation failed:', error.message);
		console.log('✓ Skipping PDF generation (will use local copy if available)');
	}
}

buildResume().catch(error => {
	console.error('✗ Error building resume:', error.message);
	process.exit(1);
});
