import fetch from "node-fetch";

interface People {
  count: number;
  next: string;
  previous: null;
  results: Array<object>;
}

export class Fetch {
  public peopleURL: string = "https://swapi.dev/api/";

  public getPeople = async () => {
    try {
      const response: any = await fetch(`${this.peopleURL}people`, {
        method: "GET",
      });
      const content: People = await response.json();
      return content;
    } catch (err) {
      console.log(err);
    }
  };
}
