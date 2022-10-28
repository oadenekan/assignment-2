import { useReducer } from "react";

const countReducer = (initialState = 0, action) => {
  if (action === "increment") {
    return initialState + 1;
  } else if (action === "decrement") {
    if (initialState > -1) throw new Error('I crashed');
    else return initialState - 1;
  } else if (action === "reset") {
    return (initialState = 0);
  } else {
    return initialState;
  }
};
export default function Counter() {
  const [count, dispatch] = useReducer(countReducer, 0);

  return (
    <div className="App">
      <p>React Counter With Reducer to demonstrate error boundary if counter decrease to -1</p>
      <h1>{count}</h1>
      <button onClick={() => dispatch("increment")}>Increment</button>
      <button onClick={() => dispatch("decrement")}>Decrement</button>
      <button onClick={() => dispatch("reset")}>Reset</button>
    </div>
  );
}