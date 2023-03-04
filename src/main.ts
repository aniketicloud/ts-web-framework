import { User, UserInfo } from "./models/User";
import "./style.css";

const testUser: UserInfo = { name: "Aniket", age: 30 };

const user = new User({ id: 2 });
user.fetch();

setTimeout(() => {
  console.log(user);
}, 4000);
