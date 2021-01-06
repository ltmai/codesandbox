/**
 * @return a Promise that does nothing but completes
 *         after given number of milliseconds
 */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @param   val : input parameter to be passed on (resolve)
 * @param   ms  : time in milliseconds
 * @returns Promise that schedules invoking resolve() which resolves
 *          the Promise with value val, after ms milliseconds.
 */
const delay = (val, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(val), ms));

/**
 * @param acc : an accumulating Promise
 * @param val : a function acting as onFulfilled(value)
 * @returns a new Promise
 */
const applyAsync = (acc, val) => acc.then(val);

/**
 * composeAsync< is an alternative of the following:
 * Promise.resolve(x).then(f1).then(f2).then(f3)
 *
 * @param funcs : array of functions to be executed in sequence
 * @returns a Promise that schedules the functions in sequence
 */
const composeAsync = (...funcs) => (x) =>
  funcs.reduce(applyAsync, Promise.resolve(x));

export { wait, delay, composeAsync };

export const test_promise = () => {
  let t1 = wait(5000).then((result) =>
    console.log("Task completed after 5 seconds")
  );
  let t2 = wait(4000).then((result) =>
    console.log("Task completed after 4 seconds")
  );
  let t3 = wait(3000).then((result) =>
    console.log("Task completed after 3 seconds")
  );
  let t4 = wait(2000).then((result) =>
    console.log("Task completed after 2 seconds")
  );

  // Run promises (even when its execution code already started) and wait until they
  // are all complete, there is no implied ordering (maybe parallely or sequentially)
  Promise.all([t1, t2, t3, t4]).then((results) => {
    console.log("All completed");
  });

  // f1, f2, f3 are functions that returns a Promise on execution
  let addSalami = (val) => delay(val, 100).then((val) => val + " with salami");
  let addThunfish = (val) =>
    delay(val, 100).then((val) => val + " and thunfish");
  let addOliver = (val) => delay(val, 100).then((val) => val + " and oliver");

  const bake = composeAsync(addSalami, addThunfish, addOliver);
  bake("Pizza").then(console.log);
};
