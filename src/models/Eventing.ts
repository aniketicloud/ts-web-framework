export type Callback = () => void;

export class Eventing {
  /**
   * Events with their array of callback functions
   */
  public events: { [key: string]: Callback[] } = {};

  /**
   * Registers an event handler with this object,
   * so other parts of the app know when something changes
   * @param eventName Event listener
   * @param callback callback function
   */
  on(eventName: string, callback: Callback) {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  /**
   * Triggers an event to tell other parts of the app
   * that something has changed
   * @param eventName Name of the Event listener
   */
  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) return;
    handlers.forEach((callback) => {
      callback();
    });
  }
}
