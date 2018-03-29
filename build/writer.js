'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Writer = undefined;

var _parser = require('./parser');

var _lexer = require('./lexer');

const XMLStart = /\(\s*</,
      XMLEnd = />\s*\)/;
const tailingComma = /,\s*$/;
const customTag = /^[A-Z]/;

const JS = 0,
      XML = 1;
const { TEXT } = _lexer.type;

class Writer {
  constructor(code) {
    this.code = code;
    this.parts = [];
    this.parser = new _parser.Parser();
  }

  write() {
    this._splitXML();
    const self = this;
    const parts = this.parts;
    let res = '';
    parts.forEach(part => {
      res += part.value;
    });

    //console.log(res);
    return res;
  }

  _emitH(vTree) {
    if (!vTree) return null;
    // final result.
    let result = 'h(\n\t';

    // for shorter reference and faster access.
    let attrs = vTree.attrs,
        dAttrs = vTree.dAttrs,
        tagName = vTree.tagName,
        children = vTree.children;

    let tagNameLiteral = '',
        attrsLiteral = '';

    let self = this;

    if (!vTree.tagName) {
      throw new Error('Unrecognizable shit');
    }

    tagNameLiteral = tagName.match(customTag) ? `${tagName}, ` : `"${tagName}", `;
    attrsLiteral = this._emitAttrs(attrs);
    attrsLiteral += this._emitAttrs(dAttrs);
    // strip tailing comma.
    attrsLiteral = attrsLiteral.replace(tailingComma, '');
    attrsLiteral = attrsLiteral !== '' ? `{ ${attrsLiteral} }` : '';

    result += `${tagNameLiteral}`;
    result += attrsLiteral.length ? attrsLiteral : 'null';

    if (children) {
      children.forEach(child => {
        if (child.tagName) result = `${result}, ${self._emitH(child)}`;else if (child._type === TEXT) {
          result = `${result}, ${self._emitText(child)}`;
        }
      });
    }

    result += ')';
    return result;
  }

  _emitAttrs(attrsObj) {
    let literal = '';

    const keys = Object.keys(attrsObj || {});
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        literal += `${keys[i]}: ${attrsObj[keys[i]]}, `;
      }
    }

    return literal;
  }

  _emitText(textObj) {
    if (!textObj) return '';
    let literal = '';

    const text = textObj.text || '';
    const dText = textObj.dText || '';
    literal += text.length ? `"${text}"` : `${dText}`;
    return literal;
  }

  /** 
   * Split code into different parts. 
  */
  _splitXML() {
    let startIndex = 0,
        endIndex = 0,
        vTree = void 0,
        parser = this.parser,
        code = this.code,
        parts = this.parts,
        match = code.match(XMLStart);

    // No XML is found.
    if (!match) {
      this.parts.push({
        type: JS,
        value: code
      });
      return parts;
    }

    while (code.length && match) {
      startIndex = match.index;
      match = code.match(XMLEnd);

      if (!match) throw new Error(`Missing end: ${code[startIndex]}`);

      endIndex = match.index;
      vTree = parser.toVTree(code.substring(startIndex + 1, endIndex + 1));

      parts.push({
        type: JS,
        value: code.substring(0, startIndex)
      });

      parts.push({
        type: XML,
        value: this._emitH(vTree[0])
      });

      code = code.substring(endIndex + match[0].length);
      match = code.match(XMLStart);
    }

    if (code.length) {
      parts.push({
        type: JS,
        value: code
      });
    }
  }
}
exports.Writer = Writer;
//# sourceMappingURL=writer.js.map