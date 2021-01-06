/**
 * decorates console.log with timstamp.
 * should be called once per application.
 */
export default function changeConsoleLog() {
  (function (console) {
    let orig_console_log = console.log;
    console.log = (msg) => {
      orig_console_log(new Date().toUTCString() + ": " + msg);
    };
  })(console);
}

export function wait(intervalInMillis) {
  return new Promise((resolve, reject) => {
    setInterval(resolve, intervalInMillis);
  });
}

export function delay(value, intervalInMillis) {
  new Promise((resolve, reject) => {
    setInterval(Promise.resolve(value), intervalInMillis);
  });
}
