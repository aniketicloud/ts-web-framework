import { Attributes } from "./models/Attributes";
import { User, UserInfo, UserProps } from "./models/User";
import "./style.css";
import { fetcher } from "./utils/fetcher";

const testUser: UserInfo = { name: "User One", age: 25 };

// id is present in the backend and we know it before hand.
// const user = new User({ id: 2 });
// user.set({ name: "NEW NAME", age: 999 });
// user.save();

// save the user in the backend
// const user = new User({ name: "New User", age: 23 });
// user.save();

// const user = new User(testUser);

// user.events.on("change", () => console.log("Change event triggered"));
// user.events.on("change", () => console.log("Another Change event triggered"));
// user.events.trigger("change");

// const sync = new Sync(rootUrl);

// GET
// const allUsers = await fetcher<UserInfo[]>(rootUrl);
// console.log("allUsers:", allUsers);

// POST
// try {
//   const user = await fetcher<UserInfo>(rootUrl, "POST", {
//     id: 6,
//     age: 0,
//     name: "only name",
//   });
//   console.log("user:", user);
// } catch (error) {
//   console.log("Error coming from instance:", error);
// }

// try {
//   const rawFetch = await fetch(rootUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       id: 6,
//       age: 0,
//       name: "only name",
//     }),
//   }).then((resp) => resp.json());
//   console.log(rawFetch);
// } catch (error) {
//   console.log("error from catch:", error);
// }

const attrs = new Attributes<UserProps>({ age: 2, name: "name" });
const name = attrs.get("age");
