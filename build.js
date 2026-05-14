const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const distDir = path.join(projectRoot, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const files = fs.readdirSync(projectRoot);
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const srcPath = path.join(projectRoot, file);
  const stat = fs.statSync(srcPath);
  if (!stat.isFile()) continue;

  if (ext === '.html' || ext === '.png' || ext === '.jpeg') {
    const destName = ext === '.html' ? 'index.html' : file;
    const destPath = path.join(distDir, destName);
    fs.copyFileSync(srcPath, destPath);
  }
}
