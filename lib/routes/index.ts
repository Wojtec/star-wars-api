import { Application } from "express";

import { TokenValidation } from "../middlewares/verifyToken";

import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";

export class Routes {
  private apiRoute: string = "/api/v1/";

  private authController: AuthController = new AuthController();
  private userController: UserController = new UserController();
  private tokenValidation: TokenValidation = new TokenValidation();

  //Auth routes
  public auth(app: Application) {
    app.post(`${this.apiRoute}register`, this.authController.signUp);
    app.post(`${this.apiRoute}login`, this.authController.signIn);
  }

  //User routes
  public user(app: Application) {
    app.get(
      `${this.apiRoute}films`,
      this.tokenValidation.verifyToken,
      this.userController.getFilms
    );
    app.get(
      `${this.apiRoute}species`,
      this.tokenValidation.verifyToken,
      this.userController.getSpecies
    );
    app.get(
      `${this.apiRoute}vehicles`,
      this.tokenValidation.verifyToken,
      this.userController.getVehicles
    );
    app.get(
      `${this.apiRoute}starships`,
      this.tokenValidation.verifyToken,
      this.userController.getStarships
    );
    app.get(
      `${this.apiRoute}planets`,
      this.tokenValidation.verifyToken,
      this.userController.getPlanets
    );
  }
}
