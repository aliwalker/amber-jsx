import { Parser } from '../parser';
import { type } from '../lexer';
import assert from 'assert';

const { TEXT } = type;

describe('Parser', () => {

  describe('#toVTree', () => {

    it('correct hierarchy', () => {
      const example = `
      <div id="app" className="content">
        <h1 id="heading1">{message}</h1>
        <input type="text" onSubmit={handler} />
      </div>
      `
      const parser = new Parser();
      const vTree = parser.toVTree(example)[0];

      assert.equal('h1', vTree.children[0].tagName);
      assert.equal(TEXT, vTree.children[0].children[0]._type);
      assert.equal('message', vTree.children[0].children[0].dText);
      assert.equal('input', vTree.children[1].tagName);
    });
  });
})