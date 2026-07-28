/**
 * Downloads the skill/education logos into public/logos so the site does not
 * hotlink them at request time.
 *
 * Wikimedia rate-limits hotlinked traffic (HTTP 429), which made logos load or
 * fail seemingly at random depending on which requests won the race. Serving
 * them locally removes that failure mode entirely, and is also what Wikimedia's
 * own hotlinking policy asks for.
 *
 * Run with: npm run fetch-logos
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, "public", "logos", "skills");
const LOGOS_DIR = path.join(ROOT, "public", "logos");

// Wikimedia asks for a descriptive User-Agent; a generic one gets throttled.
const UA =
  "PetersonGuoPortfolio/1.0 (https://petersonguo.com; build-time logo fetch)";

const SKILLS = [
  ["c.png", "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png"],
  ["cpp.svg", "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"],
  ["python.png", "https://1000logos.net/wp-content/uploads/2020/08/Python-Logo.png"],
  ["bash.svg", "https://upload.wikimedia.org/wikipedia/commons/8/82/Gnu-bash-logo.svg"],
  ["java.svg", "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"],
  ["typescript.svg", "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"],
  ["javascript.png", "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"],
  // Product logos, deliberately not the NVIDIA/AMD corporate marks.
  ["cuda.jpg", "https://upload.wikimedia.org/wikipedia/commons/b/b9/Nvidia_CUDA_Logo.jpg"],
  ["rocm.png", "https://upload.wikimedia.org/wikipedia/commons/7/7b/ROCm_logo.png"],
  ["llvm.png", "https://upload.wikimedia.org/wikipedia/en/d/dd/LLVM_logo.png"],
  ["mlir.svg", "https://upload.wikimedia.org/wikipedia/commons/0/0e/MLIR_Logo.svg"],
  ["pytorch.png", "https://upload.wikimedia.org/wikipedia/commons/9/96/Pytorch_logo.png"],
  ["tensorflow.svg", "https://upload.wikimedia.org/wikipedia/commons/a/ab/TensorFlow_logo.svg"],
  ["opencv.png", "https://github.com/opencv/opencv/wiki/logo/OpenCV_logo_black.png"],
  ["react.svg", "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"],
  ["nextjs.svg", "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"],
  ["nodejs.svg", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"],
  ["fastapi.svg", "https://upload.wikimedia.org/wikipedia/commons/1/1a/FastAPI_logo.svg"],
  ["flask.svg", "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg"],
  ["selenium.png", "https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png"],
  ["linux.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/dd/Linux_logo.jpg"],
  ["git.svg", "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg"],
  ["docker.svg", "https://www.docker.com/app/uploads/2023/08/logo-guide-logos-1.svg"],
  ["arduino.svg", "https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg"],
  ["postgresql.png", "https://1000logos.net/wp-content/uploads/2020/08/PostgreSQL-Logo.png"],
  ["mongodb.svg", "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg"],
  ["firebase.png", "https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png"],
];

const OTHER = [
  ["uwaterloo.svg", "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg"],
];

function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error("too many redirects"));
    https
      .get(url, { headers: { "User-Agent": UA, Accept: "image/*,*/*" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(download(res.headers.location, dest, redirects + 1));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const buf = Buffer.concat(chunks);
          if (buf.length < 100) return reject(new Error("suspiciously small"));
          fs.writeFileSync(dest, buf);
          resolve(buf.length);
        });
      })
      .on("error", reject);
  });
}

async function run(list, dir) {
  fs.mkdirSync(dir, { recursive: true });
  const failures = [];
  for (const [name, url] of list) {
    const dest = path.join(dir, name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 100) {
      console.log(`  = ${name} (cached)`);
      continue;
    }
    try {
      const size = await download(url, dest);
      console.log(`  + ${name} (${size} bytes)`);
    } catch (e) {
      console.error(`  ! ${name}: ${e.message}`);
      failures.push(name);
    }
    // Be polite; bursts are what trigger the 429s in the first place.
    await new Promise((r) => setTimeout(r, 400));
  }
  return failures;
}

/**
 * data/workData.js is generated from the resume by parseResume.js and points at
 * remote company logos, so they cannot simply be listed above. Mirror whatever
 * it references and rewrite the file to local paths.
 *
 * Safe to re-run: once rewritten there are no remote URLs left to mirror.
 */
async function mirrorWorkLogos() {
  const dataPath = path.join(ROOT, "data", "workData.js");
  if (!fs.existsSync(dataPath)) {
    console.log("[logos] no data/workData.js yet, skipping work logos");
    return [];
  }

  let source = fs.readFileSync(dataPath, "utf8");
  const urls = [...new Set(
    [...source.matchAll(/image:\s*"(https:\/\/[^"]+)"/g)].map((m) => m[1])
  )];

  if (!urls.length) {
    console.log("[logos] work logos already local");
    return [];
  }

  const dir = path.join(LOGOS_DIR, "work");
  fs.mkdirSync(dir, { recursive: true });

  const failures = [];
  for (const url of urls) {
    // Name by URL hash: the generated data has no stable id to key on.
    const hash = require("crypto").createHash("sha1").update(url).digest("hex").slice(0, 10);
    const ext = (path.extname(new URL(url).pathname) || ".png").split("?")[0];
    const name = `${hash}${ext}`;
    const dest = path.join(dir, name);

    try {
      if (!fs.existsSync(dest) || fs.statSync(dest).size <= 100) {
        const size = await download(url, dest);
        console.log(`  + work/${name} (${size} bytes)`);
      } else {
        console.log(`  = work/${name} (cached)`);
      }
      source = source.split(`"${url}"`).join(`"/logos/work/${name}"`);
    } catch (e) {
      console.error(`  ! work logo ${url}: ${e.message}`);
      failures.push(url);
    }
    await new Promise((r) => setTimeout(r, 400));
  }

  fs.writeFileSync(dataPath, source);
  return failures;
}

(async () => {
  console.log("[logos] fetching skill logos...");
  const a = await run(SKILLS, SKILLS_DIR);
  console.log("[logos] fetching other logos...");
  const b = await run(OTHER, LOGOS_DIR);
  console.log("[logos] mirroring work logos...");
  const c = await mirrorWorkLogos();

  const failed = [...a, ...b, ...c];
  if (failed.length) {
    console.error(`[logos] ${failed.length} failed: ${failed.join(", ")}`);
    process.exit(1);
  }
  console.log("[logos] done");
})();
