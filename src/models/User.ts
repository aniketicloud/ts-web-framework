import { isEmptyObject } from "../utils/common_methods";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export const rootUrl: string = "http://localhost:3000/users";

/**
 * Error message when empty object is passed while using set() method
 */
export const emptyObjectSetErrorMsg = "Cannot set empty object on the user";

/**
 * Error message when fetch method is called when id is not present on the user
 */
export const fetchErrorMsg = "Cannot fetch without id";

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;
  constructor(data: UserProps) {
    this.attributes = new Attributes<UserProps>(data);
  }

  /**
   * Returns a reference to the event's on() method
   */
  get on() {
    return this.events.on;
  }

  /**
   * Returns a reference to the event's trigger() method
   */
  get trigger() {
    return this.events.trigger;
  }

  /**
   * Returns a reference to the attribute's get() method
   */
  get get() {
    return this.attributes.get;
  }

  set = (update: UserProps): void => {
    if (isEmptyObject(update)) throw new Error(emptyObjectSetErrorMsg);
    this.attributes.set(update);
    this.events.trigger("change");
  };

  /**
   * Returns a Promise with interface of UserProps.
   * Rejects a Promise if no id is provided.
   */
  fetch = async () => {
    /**
     * fetch will first get current id of the Attributes,
     * and only if id is present, call the fetch method on the Sync.
     * We wait for response to be resolved,
     * we get the response back from the server,
     * we get the information we want,
     * and set it on Attributes instance.
     */
    const id = this.attributes.get("id");
    if (typeof id !== "number") throw new Error(fetchErrorMsg);

    try {
      const data = await this.sync.fetch(id);
      this.set(data);
    } catch (error) {
      console.log(error);
    }
  };
}
