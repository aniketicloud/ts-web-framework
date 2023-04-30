import { describe, expect, it, afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../mocks/server";

import { rootUrl, UserProps } from "../models/User";
import { fetcher } from "./fetcher";

// Start server before all tests
beforeAll(() => server.listen());

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("fetcher() with mocking data for localhost url", () => {
  it("fetches users array at '/users'", async () => {
    const users = await fetcher<UserProps[]>(rootUrl);
    expect(users).toHaveLength(2);
  });
  it("fetches users array with length 2", () => {
    return expect(fetcher<UserProps[]>(rootUrl)).resolves.toHaveLength(2);
  });
  it("throws an error for incorrect url", () => {
    return expect(fetcher("http://some-wrong-url.com")).rejects.toThrowError();
  });
  it("thows an error when reponse is not ok", () => {
    // response.ok = false in case status is not in between 200-299
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    return expect(
      fetcher("http://localhost:3000/error-url")
    ).rejects.toThrowError("301: Moved Permanently");
  });
});
