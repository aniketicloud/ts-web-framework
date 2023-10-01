import { beforeEach, describe, expect, it, vi } from "vitest";
import { Callback, Eventing } from "./Eventing";

const eventOne = "eventOne";
const eventTwo = "another-event";
const callback: Callback = () => {};

let event: Eventing;
beforeEach(() => {
  event = new Eventing();
});

describe("on()", () => {
  it("creates a new event listener with one callback", () => {
    event.on(eventOne, callback);
    expect(event.events[eventOne]).toHaveLength(1);
  });
  it("adds two same callbacks for the same event listener", () => {
    event.on(eventOne, callback);
    event.on(eventOne, callback);
    expect(event.events[eventOne]).toHaveLength(2);
  });
  it("adds one callback for eventOne event listener and two callbacks for event listener eventTwo", () => {
    event.on(eventOne, callback);
    event.on(eventTwo, callback);
    event.on(eventTwo, callback);
    expect(event.events[eventOne]).toHaveLength(1);
    expect(event.events[eventTwo]).toHaveLength(2);
  });
});

describe("trigger()", () => {
  let callbackViFn: Callback;
  beforeEach(() => {
    callbackViFn = vi.fn(() => {});
  });
  it("does not trigger a callback if eventName is not present", () => {
    event.on(eventOne, callbackViFn);
    event.trigger("fakeEvent");
    expect(callbackViFn).not.toHaveBeenCalled();
  });
  it("triggers a callback once when one callback is registered", () => {
    event.on(eventOne, callbackViFn);
    event.trigger(eventOne);
    expect(callbackViFn).toHaveBeenCalledOnce();
  });
  it("triggers the same callback twice when callbacks are registered twice", () => {
    event.on(eventOne, callbackViFn);
    event.on(eventOne, callbackViFn);
    event.trigger(eventOne);
    expect(callbackViFn).toHaveBeenCalledTimes(2);
  });
  it("triggers two separate callback functions when two separate callbacks are registered", () => {
    const secondCallbackViFn = vi.fn(() => {});
    event.on(eventOne, callbackViFn);
    event.on(eventOne, secondCallbackViFn);
    event.trigger(eventOne);
    expect(callbackViFn).toHaveBeenCalledOnce();
    expect(secondCallbackViFn).toHaveBeenCalledOnce();
  });
});
