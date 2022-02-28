const isObject = (val: unknown) =>
  typeof val === "object" && val !== null && !Array.isArray(val);

type MethodName = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
/**
 * handle server request using fetch api
 * @param {string} url name of the api url
 * @param {string} methodName request method name
 * @param {string|null} data send data to server; datatype of data depends on api
 */
export const apiCall = async (
  url: string,
  methodName: MethodName = "GET",
  data: string | null = null
) => {
  const fetchData = {
    method: methodName,
    ...(isObject(data) && { body: JSON.stringify(data) }), // add body property if data is an object
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  try {
    // Handle response you get from the server
    const data = await (await fetch(url, fetchData)).json();
    return [data, null];
  } catch (err) {
    // Handle errors you get from the server
    return [null, err];
  }
};

// const data = { title: "foo", body: "bar", userId: 1 };
// const [data, err] = await apiCall(
//   "https://jsonplaceholder.typicode.com/posts",
//   "POST",
//   data
// );

// if (err !== null) {
//   // handle errors
// }

// console.log(data);
