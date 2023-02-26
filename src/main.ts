import { User } from "./models/User";
import "./style.css";

const user = new User({ name: "Aniket", age: 30 });
user.set({ name: "newName" });
console.log(user.get("name"));
console.log(user.get("age"));
