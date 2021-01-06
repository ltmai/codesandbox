import React from "react";
import { useState } from "react";
import useInterval from "./useInterval";

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const POMODO_TIME = 25 * MS_IN_MINUTE;

const POMODO_MESSAGE_START = "Let the countdown begin!";
const POMODO_MESSAGE_RUNNING = "Keep going!";
const POMODO_MESSAGE_PAUSED = "Continue!";
const POMODO_MESSAGE_END = "Congratulation!";

function durationAsString(duration) {
  return `${String(Math.floor(duration / MS_IN_MINUTE)).padStart(
    2,
    "0"
  )}:${String(
    Math.abs(Math.floor((duration % MS_IN_MINUTE) / MS_IN_SECOND))
  ).padStart(2, "0")}`;
}

export default function Pomodo() {
  const [pomodo, setPomodo] = useState(POMODO_TIME);
  const [interval, setInterval] = useState(0);
  const [message, setMessage] = useState(POMODO_MESSAGE_START);

  useInterval(() => {
    if (pomodo >= MS_IN_SECOND) {
      setMessage(POMODO_MESSAGE_RUNNING);
      setPomodo(pomodo - MS_IN_SECOND);
    } else {
      setMessage(POMODO_MESSAGE_END);
      setPomodo(POMODO_TIME);
      setInterval(0);
    }
  }, interval);

  function handleStart() {
    if (interval) {
      setMessage(POMODO_MESSAGE_PAUSED);
      setInterval(0);
    } else {
      setInterval(MS_IN_SECOND);
    }
  }

  function handleReset() {
    setPomodo(POMODO_TIME);
    setInterval(0);
  }

  return (
    <div align="center">
      <h1>{message}</h1>
      <h1>{durationAsString(pomodo)}</h1>
      <br />
      <button onClick={handleStart}>{interval ? "pause" : "start"}</button>
      <span>&nbsp;&nbsp;</span>
      <button onClick={handleReset}>reset</button>
    </div>
  );
}
