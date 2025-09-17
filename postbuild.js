const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");
const notFoundPath = path.join(distDir, "404.html");

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log("Successfully created 404.html for SPA fallback.");
} else {
  console.error("Error: dist/index.html not found. Run build first.");
  process.exit(1);
}