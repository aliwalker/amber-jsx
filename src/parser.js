import { type, Scanner } from './lexer';

const { OPENNING, CLOSING, SELFCLOSING, TEXT } = type;

export class Parser {
  constructor(src) {
    this.src = src || ''; // current source.
    this.scanner = new Scanner(this.src);
    this.ast = {};        // cached.
  }

  toVTree(src) {
    // If it is already cached, return it.
    if (src && this.ast[src]) {
      return this.ast[src];
    // If a new source is given, make a new scanner instance.
    } else if (src) {
      this.src = src;
      this.scanner.resetSource(src);
    }

    return this._parse();
  }

  // This method only depends on `this.scanner`.
  _parse() {
    let stack   = [], // stack for holding 
        ast     = [], // will be reduced to an ast.
        src     = this.src,
        scanner = this.scanner,
        token   = scanner.getToken(),
        _depth   = 0,    // depth level, start from the outermost.
        top     = void 0, // element on top of `stack`.
        attrs   = void 0, // current tag's attrs.
        tagType = "static",
        keys    = null;
      
    while(token) {
      token._depth = _depth;

      switch(token._type) {
      case OPENNING:
        stack.push(token);
        _depth++;
        break;
      case TEXT:
        ast.push(token);
        break;
      case CLOSING:
        if (stack.length === 0)
          throw new Error(`Unmatched tag: ${token.tagName}`);

        top = stack.pop();
        if (top.tagName !== token.tagName)
          throw new Error(`Unmatched tag: ${token.tagName}`);

        ast.push(top);
        _depth--;
        break;
      default:  // SELFCLOSING
        attrs = token.attrs || void 0;
        //keys = Object.keys(attrs);

        ast.push(token);
      }
      token = scanner.getToken();
    }

    // cache it.
    this.ast[src] = this._reduce(ast);
    return this.ast[src];
  }

  _reduce(ast) {
    let childIndex, parentIndex,
        child, parent;

    while (ast.length > 1) {
      parentIndex = 0;

      // Find the most nearest shallower element.
      while(parentIndex < ast.length && 
        ast[parentIndex]._depth >= ast[0]._depth)
          parentIndex++;

      // Found its parent.
      if (parentIndex < ast.length) {
        child = ast[0];
        parent = ast[parentIndex];
        (parent.children || (parent.children = [])).push(child);
        ast.shift();
      // They're siblings.
      } else {
        return ast;
      }
    }
    return ast;
  }
}