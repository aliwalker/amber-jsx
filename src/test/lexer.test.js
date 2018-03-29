import { type, Scanner } from '../lexer';
import assert from 'assert';

const { OPENNING, TEXT, CLOSING, SELFCLOSING } = type;

describe('Lexer', () => {

  describe('#getToken', () => {
    it(`tags with no attribute`, () => {
      const example = `<div>`;
      const scanner = new Scanner(example);
      
      let token = scanner.getToken();
      assert.equal(void 0, token.attrs);
      assert.equal(void 0, token.dAttrs);
    });

    it('tags with static attributes', () => {
      const example = `<div id="app" className="content">`;
      const scanner = new Scanner(example);

      let token = scanner.getToken();
      assert.equal('"app"', token.attrs.id);
      assert.equal('"content"', token.attrs.className);
    });

    it('tags with dynamic attributes', () => {
      const example = `<input type="text" onSubmit={handler} />`;
      const scanner = new Scanner(example);

      let token = scanner.getToken();
      assert.equal('handler', token.dAttrs.onSubmit);
    });

    it('works sequentially fine', () => {
      const example = `
      <div>
        <h1>Hello { message }</h1>
      </div>
      `;
      const scanner = new Scanner(example);
      const tagNames = ['div', 'h1', 'h1', 'div'];

      let token = scanner.getToken(), i = 0;
      while(token) {
        if (token.tagName)
          token.tagName === tagNames[i++];

        if (token.text)
          token.text === 'Hello';

        if (token.dText)
          token.dText === 'message';
      }
    })
  });
});