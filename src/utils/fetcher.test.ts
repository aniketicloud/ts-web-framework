import { describe, expect, it, afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../mocks/server";

import { rootUrl, UserProps } from "../models/User";
import { fetcher } from "./fetcher";

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

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
    expect(fetcher("http://some-wrong-url.com")).rejects.toThrowError();
  });
});
