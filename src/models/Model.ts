import { isEmptyObject } from "../utils/common_methods";
import { Callback } from "./Eventing";

/**
 * Error message when empty object is passed while using set() method
 */
export const emptyObjectSetErrorMsg = "Cannot set empty object on the model";

/**
 * Error message when fetch method is called when id is not present on the user
 */
export const fetchErrorMsg = "Cannot fetch without id";
interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): Promise<T>;
  save(date: T): Promise<T>;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

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

  set = (update: T): void => {
    if (isEmptyObject(update)) throw new Error(emptyObjectSetErrorMsg);
    this.attributes.set(update);
    this.events.trigger("change");
  };

  /**
   * It fetches the data from the backend.
   * It saves the data<UserProps> and also returns a Promise of data<UserProps>.
   * When successfull, user data gets copied/replaced with server data.
   * Throws an error if no id is provided or id is not present in the database.
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
      return Promise.resolve(data);
    } catch (error) {
      throw new Error(error as string);
    }
  };

  /**
   * It takes all the attributes and calls save() method of class Sync.
   * When successfull, 'save' event will be triggered.
   * When unsuccessfull, 'error' event will be triggered.
   * If an id is not present, POST request will be sent & new user will be created.
   * If id is present, PUT method will be sent & user will be updated.
   */
  save = async (): Promise<void> => {
    try {
      await this.sync.save(this.attributes.getAll());
      this.trigger("save");
    } catch (error) {
      this.trigger("error");
    }
  };
}
