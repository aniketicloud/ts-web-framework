export const fetcher = <T>(
  url: string,
  method: "GET" | "PUT" | "POST" = "GET",
  body?: unknown
): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(url, options);
      const data: T = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
