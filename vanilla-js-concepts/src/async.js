import { delay } from "./promise";

export const test_async = () => {
  // async function returns a Promise
  const processAsync = async () => {
    let result = "";
    // await freezes calling code until the Promise completes
    result += await delay("do the first step\n", 1000);
    result += await delay("do the second step\n", 1000);
    result += await delay("do the final step\n", 1000);
    return result;
  };

  console.log("Before starting async process");
  processAsync().then((result) => console.log(result));
  console.log("After starting async process");
};
