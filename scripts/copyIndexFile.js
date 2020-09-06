const path = require('path');
const fs = require('fs');

const infile = fs.createReadStream(path.resolve(__dirname, 'publishIndex'), { flag: 'r' });

const outfile1 = fs.createWriteStream(path.resolve(__dirname, '..', 'es') + '/index.js', { flag: 'w' });
const outfile2 = fs.createWriteStream(path.resolve(__dirname, '..', 'cjs') + '/index.js', { flag: 'w' });

infile.pipe(outfile1);
infile.pipe(outfile2);
