'use strict';

var _writer = require('../writer');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Writer', () => {
  describe('#_splitXML', () => {
    it('basic test', () => {
      const example = `
      const element = (<div>Elem</div>);`;
      const writer = new _writer.Writer();
      const parts = writer._splitXML(example);

      _assert2.default.equal(_writer.JS, parts[0].type);
      _assert2.default.equal(_writer.XML, parts[1].type);
    });
  });
});
//# sourceMappingURL=writer.test.js.map