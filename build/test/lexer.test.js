'use strict';

var _lexer = require('../lexer');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { OPENNING, TEXT, CLOSING, SELFCLOSING } = _lexer.type;

describe('Lexer', () => {

  describe('#getToken', () => {
    it(`tags with no attribute`, () => {
      const example = `<div>`;
      const scanner = new _lexer.Scanner(example);

      let token = scanner.getToken();
      _assert2.default.equal(void 0, token.attrs);
      _assert2.default.equal(void 0, token.dAttrs);
    });

    it('tags with static attributes', () => {
      const example = `<div id="app" className="content">`;
      const scanner = new _lexer.Scanner(example);

      let token = scanner.getToken();
      _assert2.default.equal('"app"', token.attrs.id);
      _assert2.default.equal('"content"', token.attrs.className);
    });

    it('tags with dynamic attributes', () => {
      const example = `<input type="text" onSubmit={handler} />`;
      const scanner = new _lexer.Scanner(example);

      let token = scanner.getToken();
      _assert2.default.equal('handler', token.dAttrs.onSubmit);
    });

    it('works sequentially fine', () => {
      const example = `
      <div>
        <h1>Hello { message }</h1>
      </div>
      `;
      const scanner = new _lexer.Scanner(example);
      const tagNames = ['div', 'h1', 'h1', 'div'];

      let token = scanner.getToken(),
          i = 0;
      while (token) {
        if (token.tagName) token.tagName === tagNames[i++];

        if (token.text) token.text === 'Hello';

        if (token.dText) token.dText === 'message';
      }
    });
  });
});
//# sourceMappingURL=lexer.test.js.map