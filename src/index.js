import { Writer } from './writer';
import { Parser } from './parser';
import fs from 'fs';

const relativeStriper = /^(\.\/)|(\/)*$/;
const nameStriper = /([^\/\s*]*)\.(jsx|js)\s*$/;

export const AmberJSX = {
  /**
   * Transpile file
   * @param {String} sourcePath source path
   * @param {String} destPath optional destination path.
   */
  transpile(sourcePath, destPath) {
    var originalSourcePath = sourcePath;
    // relative path.
    if (sourcePath.startsWith('./')) {
      sourcePath = __dirname + sourcePath.replace(relativeStriper, '');
    }

    if (!nameStriper.test(sourcePath)) {
      throw new Error(`Unrecognizable file: ${sourcePath}. `);
    }

    destPath = destPath || (sourcePath.match(sourcePath)[1] + '.compiled.js');

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
