export interface UserInfo {
  name?: string;
  age?: number;
}
export class User {
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
}
