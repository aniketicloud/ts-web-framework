export const baseUrl: string = "http://localhost:3000/users";

export class Sync {
  fetch(): void {
    const id = this.get("id");
    fetch(`${baseUrl}/${id}`)
      .then((response) => {
        console.log({ response });
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        console.log({ data });
        this.set(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  /**
   * All of our models that need to be synced with a server,
   * need an `id` property
   * If the user have an id, makes a PUT request.
   * If the user does not have an id, makes a POST request.
   */
  save(): void {
    const id = this.get("id");

    if (id) {
      // put
      fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data),
      });
    } else {
      // post
      fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data),
      });
    }
  }
}
