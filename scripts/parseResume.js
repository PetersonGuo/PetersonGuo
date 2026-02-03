#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Company logo mapping
const companyLogos = {
	'nvidia': 'https://s3.amazonaws.com/cms.ipressroom.com/219/files/202512/692f50553d6332b453bbc5c2_nvidia-logo-vert-blk/nvidia-logo-vert-blk_thmb.png',
	'baseten': 'https://dzh2zima160vx.cloudfront.net/logo/aaa340387ade367703b1e49f53eb3028_304_160?Expires=1861920000&Signature=tzh4CAeWOS5gZNHx1zpz82~IV-F9F7k-e4SkQF9bDMWT0bBkeVNeUhMtjqwKYj7uipWvENmA0BVOw83Nie6hcYn5lg0gsaz7eKmCJKTncTmCmM1Rx-xk~1YeOOrYy5UFLoii-Pcv-cGIEetCnIhSrcGPVbzRuBLObFpiqHXDZoI5WAuzH73XcN56onips9670p7b4-YbNRtcCHBE4uDdk3IN~VfsMLm5uB2hs5N5OSC11bpkNfwbJ5RHffCEHkrXzG1Y0~5tSRRb1eADrgKJ3NT4WBhT3lxXMmu0SJYoPscfFitBo~eYrDn5hx6BiKROS7tbf4pyhR1PLVixPLxffA__&Key-Pair-Id=APKAII5OVX4LZ3WT422Q',
	'amd': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/800px-AMD_Logo.svg.png',
	'esentire': 'https://s3.ca-central-1.amazonaws.com/esentire-dot-com-assets/assets/eSentire_emblem_512x512.jpg',
};

// Company website mapping
const companyLinks = {
	'nvidia': 'https://www.nvidia.com/',
	'baseten': 'https://baseten.co/',
	'amd': 'https://www.amd.com/',
	'esentire': 'https://www.esentire.com/',
};

function normalizeDate(dateStr) {
	const match = dateStr.trim().match(/^(\d{1,2})\/(\d{4})$/);
	if (!match) return '';
	const month = match[1].padStart(2, '0');
	const year = match[2];
	return `${month}/${year}`;
}

function cleanLatex(text) {
	let cleaned = text;
	cleaned = cleaned.replace(/\\textbf\{([^}]*)\}/g, '$1');
	cleaned = cleaned.replace(/\\textit\{([^}]*)\}/g, '$1');
	cleaned = cleaned.replace(/\\emph\{([^}]*)\}/g, '$1');
	cleaned = cleaned.replace(/\\faIcon\{[^}]*\}/g, '');
	cleaned = cleaned.replace(/\$([^$]+)\$/g, '$1');
	cleaned = cleaned.replace(/\\cdot/g, '·');
	cleaned = cleaned.replace(/\\%/g, '%');
	cleaned = cleaned.replace(/\\&/g, '&');
	cleaned = cleaned.replace(/\\rightarrow/g, '→');
	cleaned = cleaned.replace(/\s+/g, ' ').trim();
	return cleaned;
}

function readBracedContent(text, startIndex) {
	let depth = 0;
	let i = startIndex;
	let content = '';
	for (; i < text.length; i++) {
		const char = text[i];
		if (char === '{') {
			depth++;
			if (depth > 1) content += char;
			continue;
		}
		if (char === '}') {
			depth--;
			if (depth === 0) break;
			content += char;
			continue;
		}
		content += char;
	}
	return { content, endIndex: i };
}

function extractResumeItems(block) {
	const items = [];
	let idx = 0;
	const token = '\\resumeItem{';
	while (idx < block.length) {
		const start = block.indexOf(token, idx);
		if (start === -1) break;
		const braceStart = start + token.length - 1;
		const { content, endIndex } = readBracedContent(block, braceStart);
		if (content) {
			items.push(cleanLatex(content));
		}
		idx = endIndex + 1;
	}
	return items;
}

// Parse jobs directly from TeX resume
function parseExperiencesFromTex(tex) {
	const withoutComments = tex.replace(/(^|[^\\])%.*$/gm, '$1');
	const expMatch = withoutComments.match(/\\section\{Experience\}([\s\S]*?)(?=\\section\{|\Z)/);
	if (!expMatch) {
		throw new Error('Could not find Experience section in TeX');
	}
	const expSection = expMatch[1];
	const experiences = [];

	const subheadingRegex = /\\resumeSubheading\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}([\s\S]*?)(?=\\resumeSubheading|\\resumeSubHeadingListEnd)/g;
	let match;
	while ((match = subheadingRegex.exec(expSection)) !== null) {
		const title = cleanLatex(match[1]);
		const dateRange = cleanLatex(match[2]);
		const company = cleanLatex(match[3]);
		const location = cleanLatex(match[4]);
		const block = match[5] || '';

		const dateMatch = dateRange.match(/(\d{1,2}\/\d{4})\s*[-–—]{1,2}\s*(\d{1,2}\/\d{4})/);
		const start = dateMatch ? normalizeDate(dateMatch[1]) : '';
		const end = dateMatch ? normalizeDate(dateMatch[2]) : '';

		const description = extractResumeItems(block);

		experiences.push({
			title,
			company,
			location,
			start,
			end,
			description,
		});
	}

	return experiences;
}
async function generateWorkData() {
	const texPath = path.join(__dirname, '../public/Peterson_Guo_Resume.tex');
	try {
		if (!fs.existsSync(texPath)) {
			throw new Error(`Resume TeX not found at ${texPath}`);
		}

		const texContent = fs.readFileSync(texPath, 'utf8');

		// Parse experiences from the TeX source
		const experiences = parseExperiencesFromTex(texContent);

		// Convert to WorkData format
		const workData = experiences.map(job => {
			const [startMonth, startYear] = job.start.split('/');
			const [endMonth, endYear] = job.end.split('/');
			return {
				title: job.title,
				company: job.company,
				image: companyLogos[job.company.toLowerCase()] || '',
				start: new Date(`${startMonth}/01/${startYear}`),
				end: new Date(`${endMonth}/01/${endYear}`),
				description: job.description,
				location: job.location,
				link: companyLinks[job.company.toLowerCase()] || '',
			};
		});

		// Validate data
		if (workData.length === 0) {
			console.warn('⚠ Warning: No work experiences found');
		}

		workData.forEach((job, idx) => {
			if (!job.title || !job.company) {
				throw new Error(`Work experience #${idx + 1} missing title or company`);
			}
			if (job.description.length === 0) {
				console.warn(`⚠ Warning: Work experience "${job.title}" has no descriptions`);
			}
		});

		// Generate the JavaScript code for ESM export
		const jsCode = `// Auto-generated from resume
// Source: public/Peterson_Guo_Resume.tex
// Last updated: ${new Date().toISOString()}

const WorkData = [
${workData.map(job => {
	const startDate = job.start.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
	const endDate = job.end.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

	return `\t{
\t\ttitle: "${job.title.replace(/"/g, '\\"')}",
\t\tcompany: "${job.company}",
\t\timage: "${job.image}",
\t\tstart: new Date("${startDate}"),
\t\tend: new Date("${endDate}"),
\t\tdescription: [
${job.description.map(desc => `\t\t\t"${desc.replace(/"/g, '\\"')}"`).join(',\n')}
\t\t],
\t\tlocation: "${job.location}",
\t\tlink: "${job.link}",
\t},`;
}).join('\n')}
];

export default WorkData;
`;

		// Write to file
		const outputPath = path.join(__dirname, '../data/workData.js');
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		fs.writeFileSync(outputPath, jsCode);

		console.log(`✓ Generated workData.js at ${outputPath}`);
		console.log(`✓ Parsed ${workData.length} work experiences`);
		console.log(`✓ Resume is ATS-friendly and parseable`);
	} catch (error) {
		console.error('✗ Error generating work data:', error.message);
		process.exit(1);
	}
}

generateWorkData();
