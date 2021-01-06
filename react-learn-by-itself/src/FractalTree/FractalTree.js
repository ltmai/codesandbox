import React from "react";
import ReactDOM from "react-dom";
import { getBoxStyle } from "./PythagorasTree.js";

// Don't set `totalLevels` above 8 -- your browser will
// freeze due to the amount of work required.
let totalLevels = 5;
let heightFactor = 0.4;
let lean = -0.2;
let size = 100;

// a React function component with pure javascript
export function fractalTree() {
  const TreeBox = (props) => {
    const style = getBoxStyle({
      level: props.level,
      right: props.right,
      heightFactor,
      lean,
      size,
      totalLevels
    });

    const rightChild =
      props.level < totalLevels &&
      React.createElement(TreeBox, {
        level: props.level + 1,
        right: true
      });

    const leftChild =
      props.level < totalLevels &&
      React.createElement(TreeBox, {
        level: props.level + 1,
        right: false
      });

    return React.createElement("div", { style }, leftChild, rightChild);
  };

  ReactDOM.render(
    React.createElement(TreeBox, { level: 0 }),
    document.getElementById("root")
  );
}
