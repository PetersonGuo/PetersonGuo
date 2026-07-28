/** @type {import('next').NextConfig} */

// `images.domains` is deprecated; remotePatterns is the supported form.
const imageHosts = [
  // Skill logos
  "upload.wikimedia.org",
  "commons.wikimedia.org",
  "1000logos.net",
  "www.docker.com",
  "firebase.google.com",
  "github.com",
  "opencv.org",
  "mlir.llvm.org",
  "www.svgrepo.com",
  "logos-world.net",
  // Work / company logos (see data/workData.js)
  "www.baseten.co",
  "s3.amazonaws.com",
  "s3.ca-central-1.amazonaws.com",
  "georgian.io",
  "dzh2zima160vx.cloudfront.net",
];

const nextConfig = {
  images: {
    remotePatterns: imageHosts.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
    // Many of the skill and company logos are SVGs, which next/image refuses to
    // optimize by default because remote SVGs can embed scripts. The CSP and
    // attachment disposition below neutralise that, which is the mitigation
    // Next documents for exactly this case.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
