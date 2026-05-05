const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const buffer = fs.readFileSync(filePath);
  const metadata = await sharp(buffer).metadata();
  
  const targetPath = filePath.replace(ext, '.webp');
  
  let pipeline = sharp(buffer);
  
  // Resize nếu ảnh quá lớn (max width 1200px)
  if (metadata.width > 1200) {
    pipeline = pipeline.resize(1200);
  }

  // Chuyển sang webp với quality tối ưu
  await pipeline
    .webp({ quality: 75, effort: 6 })
    .toFile(targetPath + '.tmp');

  // Thay thế file cũ
  fs.renameSync(targetPath + '.tmp', targetPath);
  
  if (ext !== '.webp') {
    fs.unlinkSync(filePath);
    console.log(`Converted & Optimized: ${path.relative(publicDir, filePath)} -> .webp`);
  } else {
    const oldSize = buffer.length;
    const newSize = fs.statSync(targetPath).size;
    console.log(`Optimized: ${path.relative(publicDir, filePath)} (${(oldSize/1024).toFixed(1)}KB -> ${(newSize/1024).toFixed(1)}KB)`);
  }
}

async function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await walkDir(fullPath);
    } else {
      await optimizeImage(fullPath);
    }
  }
}

async function run() {
  console.log('Starting image optimization...');
  if (fs.existsSync(imagesDir)) {
    await walkDir(imagesDir);
  }
  
  const songHyPath = path.join(publicDir, 'song-hy-gold.png');
  if (fs.existsSync(songHyPath)) {
    await optimizeImage(songHyPath);
  }
  console.log('Optimization complete!');
}

run().catch(console.error);
