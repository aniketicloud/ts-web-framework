/// <reference types="vitest" />

import { beforeEach, describe, expect, it } from "vitest";
import { Callback, User, UserInfo } from "./User";

let mockUser: UserInfo;
let user: User;
beforeEach(() => {
  mockUser = {
    name: "user_name",
    age: 30,
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
  let changedUserData: UserInfo;
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
});

describe("on()", () => {
  const eventOne = "eventOne";
  const eventTwo = "another-event";
  const callback: Callback = () =>
    void it("creates a new event listener with one callback", () => {
      user.on(eventOne, callback);
      expect(user.events[eventOne]).toHaveLength(1);
    });
  it("adds two callbacks for the same event listener", () => {
    user.on(eventOne, callback);
    user.on(eventOne, callback);
    expect(user.events[eventOne]).toHaveLength(2);
  });
  it("adds one callback for eventOne event listener and two callbacks for event listener eventTwo", () => {
    user.on(eventOne, callback);
    user.on(eventTwo, callback);
    user.on(eventTwo, callback);
    expect(user.events[eventOne]).toHaveLength(1);
    expect(user.events[eventTwo]).toHaveLength(2);
  });
});
