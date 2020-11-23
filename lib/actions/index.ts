import fetch from "node-fetch"; // Import node-fetch for feching API.
import config from "../config"; // Import config with process environments.

/**
 *
 * ACTIONS FOR API INTEGRATION
 *
 * */

// People object interface for getPeople method fetching.
interface PeopleInterface {
  count: number;
  next: string;
  previous: null;
  results: Array<object>;
}
// Export class Fetch.
export class Fetch {
  // Async method of Fetch class for fetching all people from API.
  public getPeople = async (): Promise<PeopleInterface | undefined> => {
    // try catch block
    try {
      // Fetch promise method with api path and method GET assigned to response variable.
      const response = await fetch(`${config.API_PATH}people`, {
        method: "GET",
      });
      // Resolve promise response and return json data from API.
      return await response.json();
      // If is some error, catch and display in console.log().
    } catch (err) {
      console.log(err);
    }
  };

  // Async method of Fetch class for fetching hero by ID from API.
  public findHero = async (id: number): Promise<object | undefined> => {
    // try catch block
    try {
      // Fetch promise method with api path and method GET assigned to response variable.
      const response = await fetch(`${config.API_PATH}people/${id}`, {
        method: "GET",
      });
      // Resolve promise response and return json data from API.
      return await response.json();
      // If is some error, catch and display in console.log().
    } catch (err) {
      console.log(err);
    }
  };

  // Async method of Fetch class for fetching all resources from API.
  public getResources = async (url: string): Promise<object | undefined> => {
    // try catch block
    try {
      // Fetch promise method with api path and method GET assigned to response variable.
      const response = await fetch(url, {
        method: "GET",
      });
      // Resolve promise response and return json data from API.
      return await response.json();
      // If is some error, catch and display in console.log().
    } catch (err) {
      console.log(err);
    }
  };
}
