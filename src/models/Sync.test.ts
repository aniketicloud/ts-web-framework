import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { server } from "../mocks/server";
import { ApiSync } from "./ApiSync";
import { rootUrl, UserProps } from "./User";

// create an instance before each test
let sync: ApiSync<UserProps>;
beforeEach(() => {
  sync = new ApiSync<UserProps>(rootUrl);
});

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("fetch()", () => {
  it("returns a User 1 for id 1 when promise is resolved", async () => {
    const user = await sync.fetch(1);
    expect(user).toBeDefined();
    expect(user.age).toBe(21);
    expect(user.id).toBe(1);
    expect(user.name).toBe("User 1");
  });
  it("returns a User 1 for id 1 when promise is resolved", () => {
    return expect(sync.fetch(3)).rejects.toThrowError();
  });
});

describe.todo("save()");
