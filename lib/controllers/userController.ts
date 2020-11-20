import { Request, Response, NextFunction } from "express";

export class UserController {
  //Get films
  public getFilms(req: Request, res: Response, next: NextFunction) {
    try {
      res.send("signin");
    } catch (err) {
      next(err);
    }
  }

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
