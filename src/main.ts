import { User, UserInfo } from "./models/User";
import "./style.css";

const testUser: UserInfo = { name: "Aniket", age: 30 };

const user = new User({ id: 4 });
user.fetch();

setTimeout(() => {
  console.log(user);
}, 4000);
