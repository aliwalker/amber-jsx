import { JS, XML, Writer } from '../writer';
import assert from 'assert';

describe('Writer', () => {
  describe('#_splitXML', () => {
    it('basic test', () => {
      const example = `
      const element = (<div>Elem</div>);`;
      const writer = new Writer();
      const parts = writer._splitXML(example);

      assert.equal(JS, parts[0].type);
      assert.equal(XML, parts[1].type);
    });
  });
})