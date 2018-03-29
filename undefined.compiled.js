function Hello(props) {
  return h(
	"div", { id: "app", onClick: props.handler }, h(
	"h1", null, "Hello, world!"), h(
	"h2", null, "It is", props.message, "."));
}

const element = h(
	Hello, null);