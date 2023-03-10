export class Attributes<T> {
  /**
   * Gives us the ability to store properties tied to this entity (name, age, etc.)
   * @param data Object to store information about a particular entity(name, age, etc.)
   */
  constructor(private data: T) {}

  /**
   * Returns single piece of info about this entity (name, age, etc.)
   * @param propName The property name of entity like name, age
   * @returns The value of the proprty name
   */
  get(propName: string): number | string {
    return this.data[propName];
  }

  /**
   * Changes information about this entity ( name, age, etc.)
   * @param update Object of entity Info
   */
  set(update: T): void {
    // Object.assign(this.data, update);
    this.data = { ...this.data, ...update };
  }
}
