import { User } from "./models/User";

const user = new User({ name: "new record", age: 0 });

class Person {
  constructor(public firstname: string, public lastname: string) {}

  get fullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}

const person = new Person("nike", "olympus");
console.log(person.fullname);
