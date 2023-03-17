import { fetcher } from "../utils/fetcher";
interface HasId {
  id?: number;
}
export class Sync<T extends HasId> {
  /**
   * It takes a URL to which request will be made.
   * It must satisfies HasId interface.
   * For making requests id(number) is required to make request.
   * @param rootUrl Base/Root URL to which requests will be made
   */
  constructor(private rootUrl: string) {}

  /**
   * It makes a GET request to rootUrl/{id}
   * It returns a Promise<T> having type of the entity.
   * @param id id of the entity to be fetched.
   * @returns a promise having type of the entity, e.g. UserProps.
   */
  fetch = (id: number): Promise<T> => {
    return fetcher(`${this.rootUrl}/${id}`);
  };

  /**
   * Creates or updates the data at the server.
   * It makes a PUT request if entity has an id else POST.
   * @param data model data to save at server
   */
  save = (data: T): void => {
    /**
     * All of our models that need to be synced with a server, need an `id` property
     * If the user have an id, makes a PUT request.
     * If the user does not have an id, makes a POST request.
     */
    const { id } = data;

    if (id) {
      // Update: PUT request
      fetcher(`${this.rootUrl}/${id}`, "PUT", data);
    } else {
      // Create: POST request
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
