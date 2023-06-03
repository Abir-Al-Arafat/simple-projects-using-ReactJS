let count = 0;
function Message() {
  count++;
  return <h1>Hello world {count}</h1>;
}

export default Message;
