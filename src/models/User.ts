import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export const rootUrl: string = "http://localhost:3000/users";
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

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }
}
