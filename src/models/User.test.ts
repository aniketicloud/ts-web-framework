/// <reference types="vitest" />

import { beforeEach, describe, expect, it } from "vitest";
import { User, UserInfo } from "./User";

let mockUser: UserInfo;
let user: User;
describe("User class", () => {
  beforeEach(() => {
    mockUser = {
      name: "user_name",
      age: 29,
    };
    user = new User(mockUser);
  });
  describe("get()", () => {
    it("returns user name & age", () => {
      expect(user.get("name")).toBe(mockUser.name);
      expect(user.get("age")).toBe(29);
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
    });
    it("sets only age", () => {
      user.set({ age: changedUserData.age });
      expect(user.get("age")).toBe(changedUserData.age);
    });
  });
});
