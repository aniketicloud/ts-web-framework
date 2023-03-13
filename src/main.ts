import { User } from "./models/User";

const user = new User({ id: 4 });

user.on("change", () => {
  console.log("user was changed");
});
user.fetch();
console.log(user.get("name"));
