#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const orig = path.resolve('./src/App.js');
const dest = path.resolve('./test-src/App.js');

const CBMPATH = '\'../tests/mock-cbm/index\'';
const SAMPLESPATH = '\'../tests/mock-cbm/sample-data\'';

try {
    console.log('Replacing magic vars in %s', orig);
    let content = fs.readFileSync(orig, 'utf8');

    content = content.replace(/__CBMPATH__/g, CBMPATH);
    content = content.replace(/__SAMPLESPATH__/g, SAMPLESPATH);

    fs.writeFileSync(dest, content, 'utf8');

    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}
