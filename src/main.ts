import { User } from "./models/User";

const user = new User({ name: "new record", age: 0 });

user.on("change", () => {
  console.log("user was changed");
});

// console.log(user.get("name"));

const colors = {
  color: "red",
  printColor() {
    console.log(this.color);
  },
};

const color = "blue";
// colors.printColor(); // red
const printColor = colors.printColor; // undefined: Cannot read properties of undefined (reading 'color')
printColor.bind(this)();
