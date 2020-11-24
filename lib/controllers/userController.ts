import { Request, Response, NextFunction } from "express"; // Import interfaces from express.
import { Fetch } from "../actions"; // Import Fetch from actions folder.
import { Cache } from "../services/cache"; // Import Cache service from services folder.
import config from "../config"; // Import config with process environments.
import UserModel from "../models/userModel"; // Import user model and interface from model folder.
import { Utils } from "../utils/index"; // Import utils methods from utils folder.

/**
 *
 * USER CONTROLLER
 * getElemementsById
 * getFilms
 * getSpecies
 * getVehicles
 * getStarships
 * getPlanets
 *
 * */

// Hero object interface for getHero.
interface HeroInterface {
  _id: string;
  email: string;
  hero: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: Array<string>;
    species: Array<string>;
    vehicles: Array<string>;
    starships: Array<string>;
    created: string;
    edited: string;
    url: string;
  };
}

// Export class UserController.
export class UserController {
  // Create utils object from Utils class.
  private utils: Utils = new Utils();
  // Create fetch object from Fetch class.
  private fetch: Fetch = new Fetch();
  // Create cache object from Cache class.
  private cache: Cache = new Cache();

  // Method getElemementsById returns resources by id from API.
  public getElemementsById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Try catch block.
    try {
      // Set variables from request.
      const { userId, path } = req;
      // Set variables from request params.
      const { id } = req.params;
      // Get resource name from request path.
      let resourcesName = path.split("/").slice(3, 4).join("/");
      // Create API path with resourse name and id from request params.
      const API_PATH = config.API_PATH + resourcesName + "/" + id + "/";
      // Get hero from database use cache mechanism for checking if data is cached if it doesn't cache new data.
      const getHero = (await this.cache.get(userId, async () => {
        // Find user from database.
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        // Return user as HeroInterface.
        return findUser;
      })) as HeroInterface;
      // Check if resourcesName are planets if is true change resourcesName to homeworld or if is false just null.
      resourcesName === "planets" ? (resourcesName = "homeworld") : null;
      // Get data from user hero by resourcesName.
      const heroElements = (getHero as any)["hero"][resourcesName];
      // Check if user hero resources id if the same as request id.
      const checkId = this.utils.compareId(heroElements, id);
      // If checkId is true use a cache mechanism and get data from API or cache.
      if (checkId) {
        const getResourcesById = await this.cache.get(
          API_PATH,
          async () => await this.fetch.getResources(API_PATH)
        );
        // Return data resources.
        return res.status(200).send(getResourcesById);
      }
      // If checkId is false, response 400 Bad Request, send the message.
      return res.status(400).send({
        message: "Your hero don't have this resources",
      });
      // If is some error, catch and call the next function with an error argument in this case it will be error handler.
    } catch (err) {
      next(err);
    }
  };

  // Method getFilms returns films resources from API.
  public getFilms = async (req: Request, res: Response, next: NextFunction) => {
    // Try catch block.
    try {
      // Set variables from request.
      const { userId } = req;

      // Get hero from database use cache mechanism for checking if data is cached if it doesn't cache new data.
      const getHero = (await this.cache.get(userId, async () => {
        // Find user from database.
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        // Return user as HeroInterface.
        return findUser;
      })) as HeroInterface;

      // Check if hero films resources have data.
      if (getHero.hero.films.length === 0) {
        // If it is true, response 400 Bad Request, send the message.
        return res.status(400).send({
          message: "This hero don't have films.",
        });
      } else {
        // If it is false, loop all films and get resources then wait for all promises are resolved and return data.
        const getFilms = await Promise.all(
          // Loop all films.
          getHero.hero.films.map(async (film) => {
            // Use cache mechanism and get data from API or cache.
            return await this.cache.get(
              film,
              async () => await this.fetch.getResources(film)
            );
          })
        );
        // Response films resources data.
        return res.status(200).send(getFilms);
      }
      // If is some error, catch and call the next function with an error argument in this case it will be error handler.
    } catch (err) {
      next(err);
    }
  };

  // Method getSpecies returns species resources from API.
  public getSpecies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Try catch block.
    try {
      // Set variables from request.
      const { userId } = req;

      // Get hero from database use cache mechanism for checking if data is cached if it doesn't cache new data.
      const getHero = (await this.cache.get(userId, async () => {
        // Find user from database.
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        // Return user as HeroInterface.
        return findUser;
      })) as HeroInterface;

      // Check if hero species resources have data.
      if (getHero.hero.species.length === 0) {
        // If it is true, response 400 Bad Request, send the message.
        return res.status(400).send({
          message: "This hero don't have species.",
        });
      } else {
        // If it is false, loop all species and get resources then wait for all promises are resolved and return data.
        const getSpecies = await Promise.all(
          // Loop all species.
          getHero.hero.species.map(async (species) => {
            // Use cache mechanism and get data from API or cache.
            return await this.cache.get(
              species,
              async () => await this.fetch.getResources(species)
            );
          })
        );
        // Response species resources data.
        return res.status(200).send(getSpecies);
      }
      // If is some error, catch and call the next function with an error argument in this case it will be error handler.
    } catch (err) {
      next(err);
    }
  };

  // Method getVehicles returns vehicles resources from API.
  public getVehicles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Try catch block.
    try {
      // Set variables from request.
      const { userId } = req;

      // Get hero from database use cache mechanism for checking if data is cached if it doesn't cache new data.
      const getHero = (await this.cache.get(userId, async () => {
        // Find user from database.
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        // Return user as HeroInterface.
        return findUser;
      })) as HeroInterface;

      // Check if hero vehicles resources have data.
      if (getHero.hero.vehicles.length === 0) {
        // If it is true, response 400 Bad Request, send the message.
        return res.status(400).send({
          message: "This hero don't have vehicles.",
        });
      } else {
        // If it is false, loop all vehicles and get resources then wait for all promises are resolved and return data.
        const getVehicles = await Promise.all(
          // Loop all vehicles.
          getHero.hero.vehicles.map(async (vehicle) => {
            // Use cache mechanism and get data from API or cache.
            return await this.cache.get(
              vehicle,
              async () => await this.fetch.getResources(vehicle)
            );
          })
        );
        // Response vehicles resources data.
        return res.status(200).send(getVehicles);
      }
      // If is some error, catch and call the next function with an error argument in this case it will be error handler.
    } catch (err) {
      next(err);
    }
  };

  // Method getStarships returns starships resources from API.
  public getStarships = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Try catch block.
    try {
      // Set variables from request.
      const { userId } = req;

      // Get hero from database use cache mechanism for checking if data is cached if it doesn't cache new data.
      const getHero = (await this.cache.get(userId, async () => {
        // Find user from database.
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        // Return user as HeroInterface.
        return findUser;
      })) as HeroInterface;

      // Check if hero starships resources have data.
      if (getHero.hero.starships.length === 0) {
        // If it is true, response 400 Bad Request, send the message.
        return res.status(400).send({
          message: "This hero don't have starships.",
        });
      } else {
        // If it is false, loop all starships and get resources then wait for all promises are resolved and return data.
        const getStarships = await Promise.all(
          // Loop all starships.
          getHero.hero.starships.map(async (starship) => {
            // Use cache mechanism and get data from API or cache.
            return await this.cache.get(
              starship,
              async () => await this.fetch.getResources(starship)
            );
          })
        );
        // Response starships resources data.
        res.status(200).send(getStarships);
      }
      // If is some error, catch and call the next function with an error argument in this case it will be error handler.
    } catch (err) {
      next(err);
    }
  };

  // Method getPlanets returns planets resources from API.
  public getPlanets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Try catch block.
    try {
      // Set variables from request.
      const { userId } = req;

      // Get hero from database use cache mechanism for checking if data is cached if it doesn't cache new data.
      const getHero = (await this.cache.get(userId, async () => {
        // Find user from database.
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        // Return user as HeroInterface.
        return findUser;
      })) as HeroInterface;

      // Get starships resources use cache mechanism and get data from API or cache.
      const getPlanets = await this.cache.get(
        getHero.hero.homeworld,
        async () => await this.fetch.getResources(getHero.hero.homeworld)
      );
      // Response starships resources data.
      return res.status(200).send(getPlanets);
      // If is some error, catch and call the next function with an error argument in this case it will be error handler.
    } catch (err) {
      next(err);
    }
  };
}
