import { fetcher } from "../utils/fetcher";
import { UserProps } from "./User";

interface HasId {
  id?: number;
}
export class Sync<T extends HasId> {
  constructor(private rootUrl: string) {}

  fetch = (id: number): Promise<UserProps> => {
    return fetcher(`${this.rootUrl}/${id}`);
  };

  /**
   * All of our models that need to be synced with a server,
   * need an `id` property
   * If the user have an id, makes a PUT request.
   * If the user does not have an id, makes a POST request.
   */
  save = (data: T): void => {
    const { id } = data;

    if (id) {
      // put
      fetch(`${this.rootUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      // post
      fetch(this.rootUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  };
}
