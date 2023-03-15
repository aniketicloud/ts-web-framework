import { rootUrl, User } from "./models/User";
import { fetcher } from "./utils/fetcher";

const user = new User({ id: 4 });

const data = await fetcher(rootUrl);
console.log(data);
