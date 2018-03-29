'use strict';

var _parser = require('../parser');

var _lexer = require('../lexer');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { TEXT } = _lexer.type;

describe('Parser', () => {

  describe('#toVTree', () => {

    it('correct hierarchy', () => {
      const example = `
      <div id="app" className="content">
        <h1 id="heading1">{message}</h1>
        <input type="text" onSubmit={handler} />
      </div>
      `;
      const parser = new _parser.Parser();
      const vTree = parser.toVTree(example)[0];

      _assert2.default.equal('h1', vTree.children[0].tagName);
      _assert2.default.equal(TEXT, vTree.children[0].children[0]._type);
      _assert2.default.equal('message', vTree.children[0].children[0].dText);
      _assert2.default.equal('input', vTree.children[1].tagName);
    });
  });
});
//# sourceMappingURL=parser.test.js.map