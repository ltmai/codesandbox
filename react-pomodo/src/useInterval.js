import { useEffect, useRef } from "react";

/**
 * useInterval Hook that sets up a timer to invokes
 * a given callback function at given interval.
 * @param {*} callback
 * @param {*} interval
 */
export default function useInterval1(callback, interval) {
  const lastCallbackRef = useRef();

  // I learned this trick from Dan Abramov: to separate the dependencies
  // (as parameters of this hook) into different useEffect calls when the
  // code runs only a part of them changes.
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  useEffect(() => {
    lastCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let timerId = null;

    if (interval) {
      // to execute the callback, pass it as a lambda
      timerId = setInterval(() => {
        lastCallbackRef.current();
      }, interval);
      console.log("Setting timer " + timerId);
    }

    return () => {
      // this runs next time when interval changes or when
      // component is unmounted: clear the current timer
      if (timerId) {
        console.log("Clearing timer " + timerId);
        clearInterval(timerId);
      }
    };
  }, [interval]);
}
