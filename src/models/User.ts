import { Eventing } from "./Eventing";

export const baseUrl: string = "http://localhost:3000/users";
export interface UserInfo {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing =  new Eventing()
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
