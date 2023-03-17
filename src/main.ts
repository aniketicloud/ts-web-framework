import { Sync } from "./models/Sync";
import { rootUrl, User, UserProps } from "./models/User";
import { fetcher } from "./utils/fetcher";

const user = new User({ name: "user_name", age: 30 });

const sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
const user1 = await sync.fetch(2);
console.log(user1);
