function Clock(props) {
  const a = h(
	"div", null, h(
	"h1", null, "Haha"));
  
  const listItems = numbers.map((number) => {
    return h(
	"li", null, number);
  });

  return h(
	"div", { id: "app", onClick: handler }, h(
	"h1", null, "Hello, world!"), h(
	"h2", null, "It is", message, "."));
}

const element = h(
	Clock, null);