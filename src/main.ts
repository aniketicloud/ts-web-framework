import { User, UserInfo } from "./models/User";
import "./style.css";

const baseUrl: string = "http://localhost:3000/users";
const testUser: UserInfo = { name: "Aniket", age: 30 };
const user = new User(testUser);

user.fetch();
