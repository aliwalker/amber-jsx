#!/usr/bin/env node
const { AmberJSX } = require('../build/index');

function amberJSX(sourcePath, destPath) {
  AmberJSX.transpile(sourcePath, destPath);
}

if (!process.argv[2]) {
  console.log('> AmberJSX: A file must be specified.');
  return;
}

amberJSX(process.argv[2], process.argv[3]);
