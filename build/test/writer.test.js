'use strict';

var _writer = require('../writer');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Writer', () => {
  describe('#_splitXML', () => {
    it('basic case', () => {
      const example = `
      const element = (<div>Elem</div>);`;
      const writer = new _writer.Writer();
      const parts = writer._splitXML(example);

      _assert2.default.equal(3, parts.length);
      _assert2.default.equal(_writer.JS, parts[0].type);
      _assert2.default.equal(_writer.XML, parts[1].type);
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
      const writer = new _writer.Writer();
      const parts = writer._splitXML(example);

      _assert2.default.equal(5, parts.length);
    });
  });

  describe('#_emitText', () => {
    it('static text', () => {
      const writer = new _writer.Writer();
      const res = writer._emitText({ text: "This is static" });

      _assert2.default.equal('"This is static"', res);
    });

    it('dynamic', () => {
      const writer = new _writer.Writer();
      const res = writer._emitText({ dText: "dynamic" });

      _assert2.default.equal('dynamic', res);
    });
  });
});
//# sourceMappingURL=writer.test.js.map