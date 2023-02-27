import { User } from "./models/User";
import "./style.css";

const user = new User({ name: "Aniket", age: 30 });
user.on("change", () => {
  console.log("change #1");
});
user.on("change", () => {
  console.log("change #2");
});
user.on("save", () => {
  console.log("save");
});

user.trigger("save");
user.trigger("change");
user.trigger("change");
