# AmberJSX
A JSX to JavaScript transpiler. Also, it can convert an HTML string into a virtual-dom tree.

## What is this for?
AmberJSX is just a project for fun. I wrote this because I know how to write one. 
AmberJSX currently will just work fine if you provide good JSX file. However, error hints are still under construction(maybe not).

One thing to note is that, you need to wrap your XML inside `()` currently, because AmberJSX will not parse your JavaScript code. 

## Usage

```bash
amberJSX inputFile.js outputFile.js
```

Suppose you have a file `hello.js` in the current working directory:

```js
function Hello(props) {
  return (
    <div id="app" onClick={props.handler}>
      <h1>Hello, world!</h1>
      <h2>It is {props.message}.</h2>
    </div>
    );
}

const element = (<Hello />);
```

You compile it on the command line, simply provide the file name:

```bash
amberJSX hello.js
```

By default, if you don't specify a output file name, it is set to `*.compiled.js`:

```js
function Hello(props) {
  return h(
	"div", { id: "app", onClick: props.handler }, h(
	"h1", null, "Hello, world!"), h(
	"h2", null, "It is", props.message, "."));
}

const element = h(
	Hello, null);
```

## Installation
```bash
git clone git@github.com:Alieeeeen/amberJSX.git
cd amberJSX
npm install . -g
```

Then you'll have it installed.

## API

- **AmberJSX.transpile(source[, dest])**

```js
import { AmberJSX } from 'amberjsx';

AmberJSX.transpile("./hello.js", "./hello.out.js");
```

- **AmberJSX.toVTree(xml)**

```js
import { AmberJSX } from 'amberjsx';

let vTree = AmberJSX.toVTree(`
<div>
    <h1>Hello World</h1>
</div>
`);

vTree[0].tagName //=> "div"
vTree[0].children[0].tagName //=> "h1"
vTree[0].children[0].children[0].text //=> "Hello World"
```
The virtual-dom tree returned by the `.toVTree` will be an array, because there might be siblings at the outermost layer:

```js
let vTree = AmberJSX.toVTree(`
<div id="1">
  <h1>OK</h1>
</div>
<div id="2">
  <h1>OK</h1>
</div>
`);

vTree[0].attrs.id //=> "1"
vTree[1].attrs.id //=> "2"
```
Dynamic attributes(something you wrap in curly braces when you write JSX.) will be stored in `dAttrs`, Dynamic children will be stored in `dText`:

```js
let vTree = AmberJSX.toVTree(`
<div id="app">
  <input id="search-bar" type="text" onChange={handleChange} />
  {message}
</div>
`);

```
