import { Request, Response, NextFunction } from "express";
import { Fetch } from "../actions";
import { Cache } from "../services/cache";
import config from "../config";

import UserModel from "../models/userModel";
import { Utils } from "../utils/index";

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

export class UserController {
  private utils: Utils = new Utils();
  private fetch: Fetch = new Fetch();
  private cache: Cache = new Cache();

  public getElemementsById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId, path } = req;
      const { id } = req.params;
      let resourcesName = path.split("/").slice(3, 4).join("/");
      const API_PATH = config.API_PATH + resourcesName + "/" + id;

      const getHero = (await this.cache.get(userId, async () => {
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        return findUser;
      })) as HeroInterface;

      resourcesName === "planets" ? (resourcesName = "homeworld") : null;
      const heroElements = (getHero as any)["hero"][resourcesName];
      const checkId = this.utils.compareId(heroElements, id);
      if (checkId) {
        const getFilmById = await this.cache.get(
          API_PATH,
          async () => await this.fetch.getResources(API_PATH)
        );
        return res.status(200).send(getFilmById);
      }

      return res.status(200).send({
        message: "Your hero don't have this resources",
      });
    } catch (err) {
      next(err);
    }
  };

  //Get films
  public getFilms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req;
      //Get hero
      const getHero = (await this.cache.get(userId, async () => {
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        return findUser;
      })) as HeroInterface;
      //Get films resources
      if (getHero.hero.films.length === 0) {
        res.status(200).send({
          message: "This hero don't have films.",
        });
      } else {
        const getFilms = await Promise.all(
          getHero.hero.films.map(async (film) => {
            return await this.cache.get(
              film,
              async () => await this.fetch.getResources(film)
            );
          })
        );
        return res.status(200).send(getFilms);
      }
    } catch (err) {
      next(err);
    }
  };

  //Get species
  public getSpecies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req;

      //Get hero
      const getHero = (await this.cache.get(userId, async () => {
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        return findUser;
      })) as HeroInterface;
      //Get species resources
      if (getHero.hero.species.length === 0) {
        res.status(200).send({
          message: "This hero don't have species.",
        });
      } else {
        const getSpecies = await Promise.all(
          getHero.hero.species.map(async (species) => {
            return await this.cache.get(
              species,
              async () => await this.fetch.getResources(species)
            );
          })
        );
        res.status(200).send(getSpecies);
      }
    } catch (err) {
      next(err);
    }
  };

  //Get vehicles
  public getVehicles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req;

      //Get hero
      const getHero = (await this.cache.get(userId, async () => {
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        return findUser;
      })) as HeroInterface;
      //Get vehicles resources
      if (getHero.hero.vehicles.length === 0) {
        res.status(200).send({
          message: "This hero don't have vehicles.",
        });
      } else {
        const getVehicles = await Promise.all(
          getHero.hero.vehicles.map(async (vehicle) => {
            return await this.cache.get(
              vehicle,
              async () => await this.fetch.getResources(vehicle)
            );
          })
        );
        res.status(200).send(getVehicles);
      }
    } catch (err) {
      next(err);
    }
  };

  //Get starships
  public getStarships = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req;

      //Get hero
      const getHero = (await this.cache.get(userId, async () => {
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        return findUser;
      })) as HeroInterface;

      //Get starships resources
      if (getHero.hero.starships.length === 0) {
        res.status(200).send({
          message: "This hero don't have starships.",
        });
      } else {
        const getStarships = await Promise.all(
          getHero.hero.starships.map(async (starship) => {
            return await this.cache.get(
              starship,
              async () => await this.fetch.getResources(starship)
            );
          })
        );
        res.status(200).send(getStarships);
      }
    } catch (err) {
      next(err);
    }
  };

  //Get planects
  public getPlanets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req;

      //Get hero
      const getHero = (await this.cache.get(userId, async () => {
        const findUser = await UserModel.findById(userId, {
          password: 0,
        });
        return findUser;
      })) as HeroInterface;

      //Get starships resources
      const getPlanets = await this.cache.get(
        getHero.hero.homeworld,
        async () => await this.fetch.getResources(getHero.hero.homeworld)
      );
      res.status(200).send(getPlanets);
    } catch (err) {
      next(err);
    }
  };
}
