import { Writer } from './writer';
import { Parser } from './parser';
import fs from 'fs';

const relativePathRe = /^(\.)\//;
const jsFile = /([^\/\s*]*)\.(jsx|js)\s*$/;

export const AmberJSX = {
  /**
   * Transpile file
   * @param {String} sourcePath source path
   * @param {String} destPath optional destination path.
   */
  transpile(sourcePath, destPath) {
    // Save original value.
    var originalSourcePath = sourcePath;
    // convert relative path to absolute path.
    if (relativePathRe.test(sourcePath)) {
      sourcePath = __dirname + '/../' + sourcePath.replace(relativePathRe, '');
    } else if (!sourcePath.startsWith('/')) {
      sourcePath = __dirname + '/../' + sourcePath;
    }

    if (!jsFile.test(sourcePath)) {
      throw new Error(`Unrecognizable file: ${sourcePath}. `);
    }

    destPath = destPath || (sourcePath.split(/\.(jsx|js)$/)[0] + '.compiled.js');

    fs.readFile(sourcePath, 'utf-8', (err, code) => {
      if (err) {
        console.log(err);
        return;
      }
      const transpiled = new Writer(code).write();
      fs.writeFile(destPath, transpiled, () => {
        console.log(`\n> AmberJSX: transpiling ${originalSourcePath}...`);
        console.log('> AmberJSX: finished.\n');
      })
    });
  },

  toVTree(code) {
    if (typeof code !== 'string')
      throw new Error('Param to `toVTree` must be a string!');

    const parser = new Parser();
    return parser.toVTree(code);
  }
};
