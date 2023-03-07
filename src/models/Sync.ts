import { UserInfo } from "./User";

export class Sync {
  constructor(private rootUrl: string) {}
  // async fetch(id: number) {
  //   try {
  //     const response = await fetch(`${this.rootUrl}/${id}`);
  //     if (!response.ok) {
  //       throw new Error("Network response was not OK");
  //     }
  //     const data = await response.json();
  //   } catch (error) {
  //     console.error(
  //       "There has been a problem with your fetch operation:",
  //       error
  //     );
  //   }
  // }

  fetch(id: number): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.rootUrl}/${id}`);
        if (!response.ok) throw new Error("Network response was not OK");
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * All of our models that need to be synced with a server,
   * need an `id` property
   * If the user have an id, makes a PUT request.
   * If the user does not have an id, makes a POST request.
   */
  save(data: UserInfo): void {
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
  }
}
