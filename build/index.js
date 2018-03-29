'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmberJSX = undefined;

var _writer = require('./writer');

var _parser = require('./parser');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const relativeStriper = /^(\.\/)|(\/)*$/;
const nameStriper = /([^\/\s*]*)\.(jsx|js)\s*$/;

const AmberJSX = exports.AmberJSX = {
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

    destPath = destPath || sourcePath.match(sourcePath)[1] + '.compiled.js';

    _fs2.default.readFile(sourcePath, 'utf-8', (err, code) => {
      if (err) {
        console.log(err);
        return;
      }
      const transpiled = new _writer.Writer(code).write();
      _fs2.default.writeFile(destPath, transpiled, () => {
        console.log(`\n> AmberJSX: transpiling ${originalSourcePath}...`);
        console.log('> AmberJSX: finished.\n');
      });
    });
  },

  toVTree(code) {
    if (typeof code !== 'string') throw new Error('Param to `toVTree` must be a string!');

    const parser = new _parser.Parser();
    return parser.toVTree(code);
  }
};
//# sourceMappingURL=index.js.map