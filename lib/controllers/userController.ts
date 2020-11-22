import { Request, Response, NextFunction } from "express";
import { Fetch } from "../actions";
import { Cache } from "../services/cache";

import UserModel from "../models/userModel";

interface heroInterface {
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
  private fetch: Fetch = new Fetch();
  private cache: Cache = new Cache();
  //Get films
  public getFilms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get hero
      const getHero = (await this.cache.get(req.userId, async () => {
        const findUser = await UserModel.findById(req.userId, {
          password: 0,
        });
        return findUser;
      })) as heroInterface;
      //Get films resources
      const getFilms = await Promise.all(
        getHero.hero.films.map(async (film) => {
          return await this.cache.get(
            film,
            async () => await this.fetch.getResources(film)
          );
        })
      );
      res.status(200).send(getFilms);
    } catch (err) {
      next(err);
    }
  };

  //Get species
  public getSpecies(req: Request, res: Response, next: NextFunction) {
    try {
      res.send("signin");
    } catch (err) {
      next(err);
    }
  }

  //Get vehicles
  public getVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      res.send("signin");
    } catch (err) {
      next(err);
    }
  }

  //Get starships
  public getStarships(req: Request, res: Response, next: NextFunction) {
    try {
      res.send("signin");
    } catch (err) {
      next(err);
    }
  }

  //Get planects
  public getPlanets(req: Request, res: Response, next: NextFunction) {
    try {
      res.send("signin");
    } catch (err) {
      next(err);
    }
  }
}
