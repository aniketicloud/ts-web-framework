export const fetcher = async <T>(
  url: string,
  method: "GET" | "PUT" | "POST" = "GET",
  body?: unknown
): Promise<T> => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  if (response.status >= 200 && response.status <= 300) {
    const data: T = await response.json();
    return data;
  } else if (!response.ok) {
    console.log(response);
    throw new Error(`${response.status}: ${response.statusText}`);
  } else {
    const errorData = await response.json();
    throw new Error(
      "Something went wrong - server side:" + JSON.stringify(errorData)
    );
  }
};
