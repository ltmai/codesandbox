import React, { useEffect } from "react";
import { useState } from "react";

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_POMODO = 25 * MS_IN_MINUTE;

/**
 *
 * @param {*} duration
 */
function durationAsString(duration) {
  return `${String(Math.floor(duration / MS_IN_MINUTE)).padStart(
    2,
    "0"
  )}:${String(
    Math.abs(Math.floor((duration % MS_IN_MINUTE) / MS_IN_SECOND))
  ).padStart(2, "0")}`;
}

/**
 *
 * @param {*} lastDuration
 * @param {*} begin
 */
function elapsed(lastDuration, begin) {
  let t = begin ? lastDuration + Date.now() - begin : lastDuration;
  return durationAsString(MS_IN_POMODO - t);
}

/**
 * Functional component Pomodo: first attempt
 *
 * This function is invoked everytime the component needs to be rendered.
 * It defiens a local variable pomodo (each time the function is invoked)
 * It also defines functions like start, stop and update. These functions
 * are created (again) each time Pomodo is invoked.
 * So when update is setup to run regularly (via setInterval), and refers
 * the state variable pomodo: it is the update function that was defined
 * in a certain run of Pomodo, and that specific function instance refers
 * the specific local state variable pomodo also defined in that run (in
 * closure).
 * That would explain why: when update refer to pomodo, it is no the last
 * component state value that we know.
 *
 * Note that update() run ASYNCHRONOUSLY, so its context during execution
 * is not the same context as function Pomodo() is last executed, but the
 * context of Pomodo() when update() was created and setInterval() was
 * invoked.
 *
 * Other functions defined inside Pomodo do not have this problem, such as
 * runClicked, start and stop. Even they refer to the local state variable
 * podomo, they have the expected context, from the latest run of Pomodo.
 *
 * This is not about good or bad. There must be better ways to implement
 * this. This is only to remind me to be careful with closure and function
 * created inside a functional component.
 *
 * So nornal functions that do no depend on hook variable/setter should be
 * moved outside a functional component to avoid unnecessary recreation.
 *
 * @param {*} props
 */
export default function Pomodo(props) {
  //console.log("Pomodo is just a function");
  /**
   * The (real) state variable is created and maintained internally by
   * useState. pomodo and setPomodo are only local variables pointing
   * to the internal state.
   * These (new) local variable are created/declared each time Pomodo
   * is invoked (to render the component)
   */
  const [pomodo, setPomodo] = useState({
    begin: null,
    running: false,
    duration: 0,
    timerId: undefined
  });

  //console.log("pomodo = " + JSON.stringify(pomodo));

  /**
   * This is only for debugging: print pomodo after each render
   */
  useEffect(() => {
    // console.log(
    //   "[ begin=" +
    //     pomodo.begin +
    //     ", " +
    //     "running=" +
    //     pomodo.running +
    //     ", " +
    //     "duration=" +
    //     pomodo.duration +
    //     ", " +
    //     "timerId=" +
    //     pomodo.timerId +
    //     " ]"
    // );
  });

  const runClicked = e => {
    pomodo.running ? stop() : start();
  };

  const start = () => {
    console.log("starting " + JSON.stringify(pomodo));
    let timerId = setInterval(update, 1000);
    let now = Date.now();

    setPomodo(prevState => {
      return {
        ...prevState,
        begin: now,
        running: true,
        timerId: timerId
      };
    });
  };

  /**
   * if you refer to the local state variable podomo here, it will contain
   * the value when the Podomo was invoked, and update() is scheduled to run
   * ASYNCHRONOUSLY, i.e. the context as start() was invoked. See more above.
   */
  const update = () => {
    /**
     * this variable pomodo from closure contains the value as start() was
     * invoked, not the current value of pomodo.
     * A function that returns pomodo as workaround will not help:
     *   const getPomodo= () => {
     *     return pomodo;
     *   }
     * Because update() was created with the instance of getPomodo() which
     * was also created in the same context. You cannot workaround closure!
     */
    console.log("updating..." + JSON.stringify(pomodo));
    /**
     * this basicly does not change the state (pomodo), just to manually
     * trigger re-renderung
     */
    setPomodo(prevState => {
      return {
        ...prevState
      };
    });
  };

  const stop = (reset = false) => {
    console.log("stopping " + JSON.stringify(pomodo));

    let updatedDuration = reset
      ? 0
      : pomodo.duration + Date.now() - pomodo.begin;

    clearInterval(pomodo.timerId);

    setPomodo(prevState => {
      return {
        ...pomodo,
        begin: null,
        running: false,
        duration: updatedDuration,
        timerId: undefined
      };
    });
  };

  function resetClicked(e) {
    stop(true);
  }

  return (
    <>
      {/* {console.log(new Date().toUTCString() + " rendering")} */}
      <h1>POMODO</h1>
      <h1>{elapsed(pomodo.duration, pomodo.begin)}</h1>
      <button onClick={runClicked}>{pomodo.running ? "pause" : "start"}</button>
      <button onClick={resetClicked}>reset</button>
    </>
  );
}
