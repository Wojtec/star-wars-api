import { Application } from "express"; // Import interfaces from express.
import { TokenValidation } from "../middlewares/verifyToken"; // Import TokenValidation middleware.
import { AuthController } from "../controllers/authController"; // Import auth controller.
import { UserController } from "../controllers/userController"; // Import user controller.

// Export class Routes.
export class Routes {
  // Set api route.
  private apiRoute: string = "/api/v1/";
  // Create authController object from Utils class.
  private authController: AuthController = new AuthController();
  // Create userController object from Utils class.
  private userController: UserController = new UserController();
  // Create tokenValidation object from Utils class.
  private tokenValidation: TokenValidation = new TokenValidation();

  //Auth routes
  public auth(app: Application) {
    // POST register route.
    app.post(`${this.apiRoute}register`, this.authController.signUp);
    // POST login route.
    app.post(`${this.apiRoute}login`, this.authController.signIn);
  }

  //User routes
  public user(app: Application) {
    // GET films route.
    app.get(
      `${this.apiRoute}films`,
      this.tokenValidation.verifyToken,
      this.userController.getFilms
    );
    // GET species route.
    app.get(
      `${this.apiRoute}species`,
      this.tokenValidation.verifyToken,
      this.userController.getSpecies
    );
    // GET vehicles route.
    app.get(
      `${this.apiRoute}vehicles`,
      this.tokenValidation.verifyToken,
      this.userController.getVehicles
    );
    // GET starships route.
    app.get(
      `${this.apiRoute}starships`,
      this.tokenValidation.verifyToken,
      this.userController.getStarships
    );
    // GET planets route.
    app.get(
      `${this.apiRoute}planets`,
      this.tokenValidation.verifyToken,
      this.userController.getPlanets
    );
    // GET BY ID ROUTES
    // films by ID
    app.get(
      `${this.apiRoute}films/:id`,
      this.tokenValidation.verifyToken,
      this.userController.getElemementsById
    );
    // species by ID
    app.get(
      `${this.apiRoute}species/:id`,
      this.tokenValidation.verifyToken,
      this.userController.getElemementsById
    );
    // vehicles by ID
    app.get(
      `${this.apiRoute}vehicles/:id`,
      this.tokenValidation.verifyToken,
      this.userController.getElemementsById
    );
    // starships by ID
    app.get(
      `${this.apiRoute}starships/:id`,
      this.tokenValidation.verifyToken,
      this.userController.getElemementsById
    );
    // planets by ID
    app.get(
      `${this.apiRoute}planets/:id`,
      this.tokenValidation.verifyToken,
      this.userController.getElemementsById
    );
  }
}
