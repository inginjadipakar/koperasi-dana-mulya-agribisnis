const fs = require('fs');
const zlib = require('zlib');

function removeCheckerboard(inputPath, outputPath) {
  const buf = fs.readFileSync(inputPath);
  
  // Find PNG chunks
  let pos = 8; // Skip PNG header
  let width, height, bitDepth, colorType, compression, filter, interlace;
  const idatChunks = [];
  
  while (pos < buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
      bitDepth = buf[pos + 16];
      colorType = buf[pos + 17];
    } else if (type === 'IDAT') {
      idatChunks.push(buf.slice(pos + 8, pos + 8 + length));
    }
    pos += 12 + length;
  }
  
  if (!idatChunks.length) return false;
  
  const idatBuffer = Buffer.concat(idatChunks);
  const uncompressed = zlib.inflateSync(idatBuffer);
  
  // 8-bit RGBA is 4 bytes per pixel + 1 filter byte per row
  const bytesPerPixel = 4;
  const rowBytes = width * bytesPerPixel + 1;
  
  for (let y = 0; y < height; y++) {
    const rowStart = y * rowBytes;
    for (let x = 0; x < width; x++) {
      const px = rowStart + 1 + x * bytesPerPixel;
      const r = uncompressed[px];
      const g = uncompressed[px + 1];
      const b = uncompressed[px + 2];
      const a = uncompressed[px + 3];
      
      // Check if pixel is part of the checkerboard (gray/white grid: R,G,B close to each other and bright > 180, and x < width * 0.45)
      const isGrayWhite = Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && r > 160;
      const isLeftArea = x < width * 0.45; // Checkerboard is on the left side of road.png
      
      if (isGrayWhite && isLeftArea) {
        uncompressed[px + 3] = 0; // Make transparent!
      }
    }
  }
  
  const compressed = zlib.deflateSync(uncompressed);
  
  // Reconstruct PNG with new IDAT
  const header = buf.slice(0, 8);
  let ihdrChunk = null;
  pos = 8;
  while (pos < buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      ihdrChunk = buf.slice(pos, pos + 12 + length);
      break;
    }
    pos += 12 + length;
  }
  
  // Create IDAT chunk
  const idatLen = Buffer.alloc(4);
  idatLen.writeUInt32BE(compressed.length, 0);
  const idatType = Buffer.from('IDAT', 'ascii');
  const idatData = Buffer.concat([idatType, compressed]);
  const crc = zlib.crc32 ? zlib.crc32(idatData) : 0; // simple fallback
  
  // Use pngjs or simple write if CRC not strictly needed by browser
  // Let's test if browser renders modified IDAT buffer
  const outBuf = Buffer.concat([
    header,
    ihdrChunk,
    idatLen,
    idatData,
    Buffer.alloc(4), // dummy CRC
    Buffer.from([0,0,0,0, 0x49,0x45,0x4E,0x44, 0xAE,0x42,0x60,0x82]) // IEND
  ]);
  
  fs.writeFileSync(outputPath, outBuf);
  console.log("Processed image written to", outputPath);
}

try {
  removeCheckerboard('c:\\Users\\HP\\Desktop\\KKN SIE ACARA\\Proker UMKM\\Koperasidanamulya\\images\\road.png', 'c:\\Users\\HP\\Desktop\\KKN SIE ACARA\\Proker UMKM\\Koperasidanamulya\\images\\road_clean.png');
} catch (e) {
  console.error("Error:", e.message);
}
