export const baseUrl: string = "http://localhost:3000/users";
export interface UserInfo {
  id?: number;
  name?: string;
  age?: number;
}
export type Callback = () => void;

export class User {
  /**
   * Events with their array of callback functions
   */
  public events: { [key: string]: Callback[] } = {};

  /**
   *
   * @param data Object to store information about a particular user(name, age, etc.)
   */
  constructor(private data: UserInfo) {}

  /**
   * Returns single piece of info about this user (name, age, etc.)
   * @param propName The property name of User Info, like name, age
   * @returns The value of the proprty name
   */
  get(propName: string): number | string {
    return this.data[propName];
  }

  /**
   * Changes information about this user ( name, age, etc.)
   * @param update Object of User Info
   */
  set(update: UserInfo): void {
    // Object.assign(this.data, update);
    this.data = { ...this.data, ...update };
  }

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

  fetch(): void {
    const id = this.get("id");
    fetch(`${baseUrl}/${id}`)
      .then((response) => {
        console.log({ response });
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        console.log({ data });
        this.set(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  /**
   * All of our models that need to be synced with a server,
   * need an `id` property
   * If the user have an id, makes a PUT request.
   * If the user does not have an id, makes a POST request.
   */
  save(): void {
    const id = this.get("id");

    if (id) {
      // put
      fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data),
      });
    } else {
      // post
      fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data),
      });
    }
  }
}
