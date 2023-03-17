/// <reference types="vitest" />

import { beforeEach, describe, expect, it, vi } from "vitest";
import { server } from "../mocks/server";
import { emptyObjectSetErrorMsg, fetchErrorMsg, User, UserProps } from "./User";

let mockUser: UserProps;
let user: User;

beforeEach(() => {
  // user without an id
  mockUser = {
    age: 30,
    name: "user_name",
  };
  user = new User(mockUser);
});

describe("get()", () => {
  it("returns user name & age", () => {
    expect(user.get("name")).toBe(mockUser.name);
    expect(user.get("age")).toBe(mockUser.age);
  });
});

describe("set()", () => {
  let changedUserData: UserProps;
  beforeEach(() => {
    changedUserData = {
      name: "new name",
      age: 50,
    };
  });
  it("sets user name & age", () => {
    user.set(changedUserData);
    expect(user.get("name")).toBe(changedUserData.name);
    expect(user.get("age")).toBe(changedUserData.age);
  });
  it("sets only name", () => {
    user.set({ name: changedUserData.name });
    expect(user.get("name")).toBe(changedUserData.name);
    expect(user.get("age")).toBe(mockUser.age);
  });
  it("sets only age", () => {
    user.set({ age: changedUserData.age });
    expect(user.get("name")).toBe(mockUser.name);
    expect(user.get("age")).toBe(changedUserData.age);
  });
  it("triggers an `change` event whenever user info is changed", () => {
    const callback = vi.fn(() => {});
    user.on("change", callback);
    user.set({ name: "new name" });
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledOnce();
  });
  it("throws an error if empty object is passed", () => {
    expect(() => user.set({})).toThrow();
    expect(() => user.set({})).toThrow(emptyObjectSetErrorMsg);
  });
});

describe("fetch()", () => {
  it("throws and error if the user does not have an id", async () => {
    await expect(user.fetch()).rejects.toThrow(fetchErrorMsg);
  });
  it("gets the User 1 with id 1 from mocked data", async () => {
    server.listen({ onUnhandledRequest: "error" });
    const user = new User({ id: 1 });
    await user.fetch();
    expect(user.get("name")).toBe("User 1");
    server.close();
    server.resetHandlers();
  });
});

describe.todo("save()", () => {
  it.todo("creates a new user if id is not present on the user instance", () => {});
  it.todo("updates the user if id is present on the user instance", () => {});
});
