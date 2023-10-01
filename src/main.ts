import { User } from "./models/User";

const user1 = new User({ id: 1 });
console.log("before", user1);
await user1.fetch();
console.log("afters", user1);
