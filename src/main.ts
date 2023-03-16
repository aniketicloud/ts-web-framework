import { rootUrl, User } from "./models/User";
import { fetcher } from "./utils/fetcher";

const user = new User({ name: "user_name", age: 30 });

user
  .fetch()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err, "HI");
  });
