import fs from 'fs';
import archiver from 'archiver';

const output = fs.createWriteStream('test-results.zip');
const archive = archiver('zip', {
  zlib: { level: 9 }, // maximum compression
});

output.on('close', () => {
  console.log(`ZIP created: ${archive.pointer()} bytes`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// 🔥 compress entire test-results folder
archive.directory('test-results/', false);

archive.finalize();