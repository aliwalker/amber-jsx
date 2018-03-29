# AmberJSX
A JSX to JavaScript transpiler. Also, it can convert an HTML into a virtual-dom tree.

I'll fix this README later on.

## What is this for?
AmberJSX is just a project for fun. I wrote this because I know how to write one. 
AmberJSX currently will just work fine if you provide good JSX file. However, error hints are still under construction(maybe not).

## Example

Suppose you have a file `hello.js`:

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

You compile it on the command line:

```bash
amberJSX path/to/hello.js output/path/to/hello.compiled.js
```

You'll get `hello.compiled.js`:

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
