import { beforeEach, describe, expect, it } from "vitest";
import { Attributes } from "./Attributes";
import { UserProps } from "./User";

let attrs: Attributes<UserProps>;
let mockAttrs: UserProps;

beforeEach(() => {
  mockAttrs = { age: 30, name: "user_name" };
  attrs = new Attributes<UserProps>(mockAttrs);
});

describe("get()", () => {
  it("gets the value of the key stored", () => {
    // !! I added toBeDefined because test will pass for .get("anything")
    expect(attrs.get("age")).toBeDefined();
    expect(attrs.get("age")).toBe(mockAttrs.age);
    expect(attrs.get("name")).toBeDefined();
    expect(attrs.get("name")).toBe(mockAttrs.name);
  });
});

describe("set()", () => {
  it("sets the new data", () => {
    attrs.set({ id: 1 });
    expect(attrs.get("id")).toBeDefined();
    expect(attrs.get("id")).toBe(1);
  });
  it("updates the data", () => {
    const newUserName = "New User name";
    attrs.set({ name: newUserName });
    expect(attrs.get("name")).toBeDefined();
    expect(attrs.get("name")).toBe(newUserName);
  });
});

describe("getAll()", () => {
  it("gets all the stored properties and values", () => {
    expect(attrs.getAll()).toEqual({ age: 30, name: "user_name" });
  });
});
