import { Sync } from "./models/Sync";
import { rootUrl, User, UserProps } from "./models/User";
import { fetcher } from "./utils/fetcher";

const user = new User({ name: "user_name", age: 30 });

const sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
sync.save({ name: "user name", age: 30 });

// const data = await fetch(rootUrl, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     name: "1212",
//   }),
// });

// console.log(data);
