import { describe, expect, it } from "vitest";
import { isEmptyObject } from "./common_methods";
import { fetch } from "cross-fetch";

describe("isEmptyObject()", () => {
  it("return true if an empty object is passed", () => {
    expect(isEmptyObject({})).toBeTruthy();
  });
  it("return false if object with any key-value is passed", () => {
    expect(isEmptyObject({ key: "value" })).toBeFalsy();
  });
});
