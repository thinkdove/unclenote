import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const mark = path.join(root, 'public/images/samchon-note-mark.svg');
const share = path.join(root, 'public/images/share-samchon-note.png');
const app = path.join(root, 'src/app');

const markSvg = await readFile(mark);
const icon = (size) => sharp(markSvg).resize(size, size).png().toBuffer();

await writeFile(path.join(app, 'icon.png'), await icon(512));
await writeFile(path.join(app, 'apple-icon.png'), await icon(180));
await writeFile(path.join(root, 'public/apple-touch-icon.png'), await icon(180));

const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(icon));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
for (let i = 0; i < sizes.length; i++) {
  const entry = 6 + i * 16;
  header.writeUInt8(sizes[i], entry);
  header.writeUInt8(sizes[i], entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(pngs[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += pngs[i].length;
}
const ico = Buffer.concat([header, ...pngs]);
await writeFile(path.join(app, 'favicon.ico'), ico);
await writeFile(path.join(root, 'public/favicon.ico'), ico);

const preview = await sharp(share)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(path.join(app, 'opengraph-image.png'), preview);
await writeFile(path.join(app, 'twitter-image.png'), preview);

console.log('Brand icons and social-preview images generated.');
