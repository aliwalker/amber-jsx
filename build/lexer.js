'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const spaceStriper = /^(\s*)|(\s*)$/g,

// No underscore is allowed.
openTagRe = /^<\s*([a-zA-Z0-9]*)((\s+[^\s]*=[^\s]*)*)\s*>$/,
      closeTagRe = /^<\/\s*([a-zA-Z0-9]*)\s*>$/,
      selfCloseRe = /^<\s*([a-zA-Z0-9]*)((\s+[^\s]*=[^\s]*)*)\s*(\/)>$/,
      attrsRe = /\s*([^\s]+)\s*=\s*([^\s]+)/g,
      nestedScriptRe = /{(.*)}/;

const type = exports.type = {
  OPENNING: 0,
  CLOSING: 1,
  SELFCLOSING: 2,
  TEXT: 3
};

const { OPENNING, CLOSING, SELFCLOSING, TEXT } = type;

class Scanner {
  constructor(src, option) {
    this.src = src || '';

    // Trim head & tail space.
    this.src = this.src.replace(spaceStriper, '');
    if (this.src !== '' && this.src[0] !== '<') throw new Error(`Unexpected token: ${this.src[0]}`);
  }

  resetSource(src) {
    if (!src) return;
    this.src = src;
  }

  getToken() {
    let lookahead = 0,
        length = this.src.length,
        src = this.src,
        token = {},
        // token object to return.
    tokenStr = '',
        // string of the current token.
    match = null,
        attrs = void 0,
        // static attributes for current token.
    dAttrs = void 0; // dynamic attributes for current token.

    // Finished.
    if (length === 0) return null;

    // Tag
    if (src[0] === '<') {
      // Scan until it meets '>'
      while (lookahead < length && src[lookahead] !== '>') lookahead++;

      // Found a tag
      if (lookahead > 0 && src[lookahead] === '>') {
        tokenStr = src.substring(0, lookahead + 1);
        this.src = src.substring(lookahead + 1).replace(spaceStriper, '');

        // Is it an open tag or self-closing tag?
        if ((match = tokenStr.match(openTagRe)) || (match = tokenStr.match(selfCloseRe))) {

          // Is there attributes?
          if (match[2]) {
            match[2].match(attrsRe).forEach(attr => {
              attr = attr.split('=');
              let key = attr[0].replace(spaceStriper, '');
              let value = attr[1].replace(spaceStriper, '');
              let dValue = null;

              if (dValue = value.match(nestedScriptRe)) {
                // strip space.
                dValue = dValue[1].replace(spaceStriper, '');
                dAttrs || (dAttrs = {});
                dAttrs[key] = dValue;
              } else {
                attrs = attrs || {};
                attrs[key] = value;
              }
            });
          }

          token.tagName = match[1];
          token.attrs = attrs;
          token.dAttrs = dAttrs;
          token._type = match[match.length - 1] === '/' ? SELFCLOSING : OPENNING;
          // Is it a close tag?
        } else if (match = tokenStr.match(closeTagRe)) {
          token.tagName = match[1];
          token._type = CLOSING;
        } else {
          throw new Error(`Unexpected token: ${tokenStr}`);
        }
      } else {
        throw new Error(`Missing '>'`);
      }
      // Text.
    } else {
      // Determine what type of text.
      while (lookahead < length && src[lookahead] !== '<' && src[lookahead] !== '{') lookahead++;

      // static text.
      if (lookahead > 0) {
        token._type = TEXT;
        token.text = src.substring(0, lookahead).replace(spaceStriper, '');
        // dynamic text
      } else if (src[lookahead] === '{') {
        while (lookahead < length && src[lookahead] !== '}' && src[lookahead] !== '<') lookahead++;

        if (src[lookahead] === '<') {
          throw new Error(`Unexpected token: <`);
        } else if (src[lookahead] === '}') {
          token._type = TEXT;
          token.dText = src.substring(1, lookahead);
          lookahead++; // ignore '}'
        }
      }
      this.src = src.substring(lookahead);
    }

    return token;
  }
}
exports.Scanner = Scanner;
//# sourceMappingURL=lexer.js.map