import fetch from "node-fetch";

interface peopleInterface {
  count: number;
  next: string;
  previous: null;
  results: Array<object>;
}

export class Fetch {
  private URL: string = "https://swapi.dev/api/";

  public getPeople = async (): Promise<peopleInterface | undefined> => {
    try {
      const response: any = await fetch(`${this.URL}people`, {
        method: "GET",
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  public findHero = async (id: number) => {
    try {
      const response: any = await fetch(`${this.URL}people/${id}`, {
        method: "GET",
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  public getResources = async (url: string) => {
    try {
      const response: any = await fetch(url, {
        method: "GET",
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
}
