// Temporary diagnostic: print dimensions + size of every image in public/images
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const dir = "public/images";

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function jpgSize(buf) {
  let i = 2;
  while (i < buf.length - 8) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    const len = buf.readUInt16BE(i + 2);
    i += 2 + len;
  }
  return null;
}

for (const name of readdirSync(dir)) {
  const p = join(dir, name);
  try {
    const kb = Math.round(statSync(p).size / 1024);
    const buf = readFileSync(p);
    let d = null;
    if (/\.png$/i.test(name)) d = pngSize(buf);
    else if (/\.jpe?g$/i.test(name)) d = jpgSize(buf);
    console.log(`${name}: ${d ? d.w + "x" + d.h : "unknown"} | ${kb} KB`);
  } catch {
    console.log(`${name}: error reading`);
  }
}
