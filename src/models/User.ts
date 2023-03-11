import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserInfo {
  id?: number;
  name?: string;
  age?: number;
}

export const rootUrl: string = "http://localhost:3000/users";
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserInfo> = new Sync<UserInfo>(rootUrl);
}
