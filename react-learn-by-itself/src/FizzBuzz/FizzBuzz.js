import React from "react";
import ReactDOM from "react-dom";
import { getBoxStyle } from "./Spiral.js";

// a React function with pure javascript
export function fizzbuzz(n) {
  const boxes = [];

  for (let i = 1; i <= n; i++) {
    let label = "";
    if (i % 3 === 0) label += "Fizz";
    if (i % 5 === 0) label += "Buzz";
    if (label === "") label = i;
    boxes[i - 1] = React.createElement(
      "div",
      { style: getBoxStyle(i - 1), key: i },
      label
    );
  }

  ReactDOM.render(
    React.createElement("div", {}, boxes),
    document.getElementById("root")
  );
}
