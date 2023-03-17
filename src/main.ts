import { Sync } from "./models/Sync";
import { rootUrl, User, UserProps } from "./models/User";
import { fetcher } from "./utils/fetcher";

const user = new User({ name: "user_name", age: 30 });

const sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
sync.save({ id: 2, name: "user name", age: 30 });
