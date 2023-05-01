import { User } from "./models/User";

const user1 = new User({ id: 1, age: 23, name: "User 1" });

try {
  await user1.fetch()
} catch (error) {
  console.log("just some error:",error)
}
