const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Đường dẫn trỏ về thư mục public từ thư mục scripts
const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');
const iconDir = path.join(publicDir, 'assets/icons');

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const buffer = fs.readFileSync(filePath);
  let metadata;
  try {
    metadata = await sharp(buffer).metadata();
  } catch (err) {
    console.error(`Error reading metadata for ${filePath}:`, err);
    return;
  }
  
  const targetPath = filePath.replace(ext, '.webp');
  
  let pipeline = sharp(buffer);
  
  // Resize nếu ảnh quá lớn (max width 1600px cho ảnh cưới)
  if (metadata.width > 1600) {
    pipeline = pipeline.resize(1600);
  }

  // Chuyển sang webp với quality tối ưu
  await pipeline
    .webp({ quality: 80, effort: 6 })
    .toFile(targetPath + '.tmp');

  // Thay thế file cũ hoặc ghi đè nếu là webp
  fs.renameSync(targetPath + '.tmp', targetPath);
  
  if (ext !== '.webp') {
    fs.unlinkSync(filePath);
    console.log(`Converted & Optimized: ${path.relative(publicDir, filePath)} -> .webp`);
  } else {
    const oldSize = buffer.length;
    const newSize = fs.statSync(targetPath).size;
    if (newSize < oldSize) {
      console.log(`Optimized: ${path.relative(publicDir, filePath)} (${(oldSize/1024).toFixed(1)}KB -> ${(newSize/1024).toFixed(1)}KB)`);
    }
  }
}

async function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
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
  const args = process.argv.slice(2);
  const targetDir = args[0] ? path.resolve(process.cwd(), args[0]) : null;

  console.log('Starting image optimization...');
  
  if (targetDir) {
    console.log(`Optimizing images in: ${targetDir}`);
    await walkDir(targetDir);
  } else {
    // Tối ưu ảnh trong thư mục images
    await walkDir(imagesDir);
    
    // Tối ưu các icon trong assets/icons
    await walkDir(iconDir);
    
    // Tối ưu icon chính ở app/ (giữ nguyên định dạng png cho favicon/apple-icon)
    const appIconPath = path.join(__dirname, '../app/icon.png');
    if (fs.existsSync(appIconPath)) {
      const buffer = fs.readFileSync(appIconPath);
      await sharp(buffer)
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(appIconPath + '.tmp');
      fs.renameSync(appIconPath + '.tmp', appIconPath);
      console.log('Optimized: app/icon.png');
    }
  }

  console.log('Optimization complete!');
}

run().catch(console.error);

