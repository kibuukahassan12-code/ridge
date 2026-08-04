/* Temporary diagnostic: read PNG/JPEG dimensions without any dependencies */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "images");

function pngSize(buf) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0xff) { i++; continue; }
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const height = buf.readUInt16BE(i + 5);
      const width = buf.readUInt16BE(i + 7);
      return { width, height };
    }
    const segLen = buf.readUInt16BE(i + 2);
    i += 2 + segLen;
  }
  return null;
}

function dims(file) {
  const full = path.join(dir, file);
  if (!fs.existsSync(full)) return null;
  const buf = fs.readFileSync(full);
  const ext = path.extname(file).toLowerCase();
  if (ext === ".png") return pngSize(buf);
  if (ext === ".jpg" || ext === ".jpeg") return jpegSize(buf);
  return null;
}

const targets = [
  "hero-scene-1.png",
  "hero-scene-2.png",
  "hero-scene-3.png",
  "Crater-Lake-Tour.jpg",
  "dsvgtdh.jpg",
  "dgfdhjyi.jpg",
  "711A6450.JPG",
  "711A6466.JPG",
  "711A6536.JPG",
  "711A6572.JPG",
  "711A6722.JPG",
  "711A6758.JPG",
];

console.log("FILE".padEnd(30), "WIDTH".padEnd(8), "HEIGHT");
for (const f of targets) {
  const d = dims(f);
  if (!d) { console.log(f.padEnd(30), "MISSING"); continue; }
  console.log(f.padEnd(30), String(d.width).padEnd(8), d.height);
}

console.log("\nFILE SIZES (KB):");
for (const f of targets) {
  const full = path.join(dir, f);
  if (!fs.existsSync(full)) continue;
  const kb = Math.round(fs.statSync(full).size / 1024);
  console.log(f.padEnd(30), kb + " KB");
}

