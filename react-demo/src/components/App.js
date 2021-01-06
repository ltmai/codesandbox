import React, { useState, useEffect } from "react";
import useMousePosition from "../hooks/useMousePosition";

export default function App(props) {
  useState(() => {
    console.log("this runs only once");
  });
  const [count, setCount] = useState(props.startValue);
  const position = useMousePosition();

  useEffect(() => {
    document.title = count;
  }, [count]);

  //console.log("inside App " + count);

  function inc() {
    setCount(count + 1);
  }

  function dec() {
    setCount(count - 1);
  }

  function reset() {
    setCount(props.startValue);
  }

  return (
    <>
      {
        //console.log("render: " + count)
      }
      <div className="App">
        <h1>{`Current count : ${count}`}</h1>
        <p>
          Mouse position: {position.x}, {position.y}
        </p>
        <input type="submit" value="decrease" onClick={dec} />
        <input type="submit" value="reset" onClick={reset} />
        <input type="submit" value="increase" onClick={inc} />
      </div>
    </>
  );
}
