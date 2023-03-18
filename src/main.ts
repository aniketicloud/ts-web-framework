import { Sync } from "./models/Sync";
import { rootUrl, User, UserProps } from "./models/User";
import { fetcher } from "./utils/fetcher";

const user = new User({ name: "user_name", age: 30 });
user.on("save", () => {
  console.log("user has been saved", user);
});
user.save();
