import { Application } from "express";
import { AuthController } from "../controllers/authController";

export class Auth {
  public authController: AuthController = new AuthController();

  public route(app: Application) {
    app.get("/", this.authController.singin);
  }
}
