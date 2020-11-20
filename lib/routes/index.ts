import { Application } from "express";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";

export class Routes {
  public authController: AuthController = new AuthController();
  public userController: UserController = new UserController();

  //Auth routes
  public auth(app: Application) {
    app.post("/api/v1/register", this.authController.signIn);
    app.post("/api/v1/login", this.authController.signIn);
  }

  //User routes
  public user(app: Application) {
    app.get("/api/v1/films", this.userController.getFilms);
    app.get("/api/v1/species", this.userController.getSpecies);
    app.get("/api/v1/vehicles", this.userController.getVehicles);
    app.get("/api/v1/starships", this.userController.getStarships);
    app.get("/api/v1/planets", this.userController.getPlanets);
  }
}
