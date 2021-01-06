import React, { useState } from "react";
import useInterval from "./useInterval";
import "./styles.css";

const INCREMENT = 50;
const MESSAGE = "|--------------------|";

/**
 * Replaces a character at given index
 * @param {*} str
 * @param {*} index
 * @param {*} chr
 */
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

/**
 * Generates the next anomation message from the given one:
 * - Move the 0 one position to the right
 * - Start again from the left if it reaches the rigth bound
 * @param {*} msg
 */
function calculateNext(msg) {
  let pos = msg.indexOf("0");
  if (pos === -1) {
    pos = 1;
  } else {
    if (pos < MESSAGE.length - 2) pos++;
    else pos = 1;
  }
  return setCharAt(MESSAGE, pos, "0");
}

/**
 *  Component: show animation using useInterval hook.
 */
export default function App() {
  const [interval, setInterval1] = useState(0);
  const [message, setMessage] = useState(MESSAGE);

  useInterval(() => {
    setMessage(calculateNext);
  }, interval);

  return (
    <div className="App">
      <pre>{message}</pre>
      <br />
      {`Speed ${interval} ms`}
      <br />
      <input
        type="submit"
        value={interval ? "slower" : "  start  "}
        onClick={() => {
          setInterval1(interval + INCREMENT);
        }}
      />
      <span>&nbsp;&nbsp;</span>
      <input
        type="submit"
        value="faster"
        onClick={() => {
          if (interval >= INCREMENT) setInterval1(interval - INCREMENT);
        }}
      />
    </div>
  );
}
