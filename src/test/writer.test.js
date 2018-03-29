import { JS, XML, Writer } from '../writer';
import assert from 'assert';

describe('Writer', () => {
  describe('#_splitXML', () => {
    it('basic case', () => {
      const example = `
      const element = (<div>Elem</div>);`;
      const writer = new Writer();
      const parts = writer._splitXML(example);

      assert.equal(3, parts.length);
      assert.equal(JS, parts[0].type);
      assert.equal(XML, parts[1].type);
    });

    it('a little bit more', () => {
      const example = `
      function Clock(props) {
        return (
          <div id="app" onClick={handler}>
            <h1>Hello, world!</h1>
            <h2>It is {message}.</h2>
          </div>
          );
      }
      
      const element = (<Clock />);`;
      const writer = new Writer();
      const parts = writer._splitXML(example);

      assert.equal(5, parts.length);
    });
  });

  describe('#_emitText', () => {
    it('static text', () => {
      const writer = new Writer();  
      const res = writer._emitText({ text: "This is static" });
    
      assert.equal('"This is static"', res);
    });

    it('dynamic', () => {
      const writer = new Writer();
      const res = writer._emitText({ dText: "dynamic" });

      assert.equal('dynamic', res);
    });
  });
})