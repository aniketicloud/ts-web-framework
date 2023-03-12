export class Attributes<T> {
  /**
   * Gives us the ability to store properties tied to this entity (name, age, etc.)
   * @param data Object to store information about a particular entity(name, age, etc.)
   */
  constructor(private data: T) {}

  /**
   * Returns single piece of info about this entity (name, age, etc.)
   * @param key The property name of entity like name, age
   * @returns The value of the proprty name
   */
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  /**
   * Changes information about this entity ( name, age, etc.)
   * @param update Object of entity Info
   */
  set = (update: T): void => {
    // Object.assign(this.data, update);
    this.data = { ...this.data, ...update };
  };
}
