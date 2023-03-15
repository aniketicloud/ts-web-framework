import { describe, expect, it } from "vitest";
import { isEmptyObject } from "./common_methods";
import { fetch } from "cross-fetch";

import {} from "../mocks/";

describe("isEmptyObject()", () => {
  it("return true if an empty object is passed", () => {
    expect(isEmptyObject({})).toBeTruthy();
  });
  it("return false if object with any key-value is passed", () => {
    expect(isEmptyObject({ key: "value" })).toBeFalsy();
  });
  it("breaks", async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const data = await response.json();
    console.log(data);
    expect(data.id).toBe(1);
  });
});
