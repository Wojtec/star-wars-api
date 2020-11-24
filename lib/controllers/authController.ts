import { Request, Response, NextFunction } from "express"; // Import interfaces from express.
import UserModel, { UserInterface } from "../models/userModel"; // Import user model and interface from model folder.
import config from "../config"; // Import config with process environments.
import { Utils } from "../utils/index"; // Import utils methods from utils folder.
import jwt from "jsonwebtoken"; // Import jsonwebtoken for generate tokens.

/**
 *
 * AUTH CONTROLLER
 * Login
 * Register
 * Generate Token
 *
 * */

// Token object interface for token generation.
interface TokenInterface {
  token: string;
  type: string;
  expiresIn: number;
}

// Export class AuthController.
export class AuthController {
  // Create utils object from Utils class.
  private utils: Utils = new Utils();
  // Create user object from UserModel class.
  private user: UserInterface = new UserModel();
  // Create expires token time in this case is 24 h 60 seconds * 60 minuts * 24 hours.
  private tokenExpires: number = 60 * 60 * 24;

  // Generate access token method with id parameter.
  public generateAccessToken = (id: string): TokenInterface => {
    // Create a token from jwt.sign method with arguments id, secret and options like algorithm type and time expire.
    const token: string = jwt.sign({ _id: id }, config.secret, {
      algorithm: "HS256",
      expiresIn: this.tokenExpires,
    });
    // Return object with token, type of token, and time expire.
    return { token, type: "Bearer", expiresIn: this.tokenExpires };
  };

  // Register user method.
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    // Try catch block
    try {
      // Set variables from request body.
      const { email, password }: { email: string; password: string } = req.body;
      // Set email from the request body into the email model database.
      this.user.email = email;
      // Encrypt and set password from the request.
      this.user.password = await this.user.encryptPassword(password);
      // Set hero from util class method getHero().
      this.user.hero = await this.utils.getHero();

      // Check if the user exists by email.
      const checkUser = await UserModel.findOne({ email: this.user.email });
      // If the user exists, response 409 conflict, send the message.
      if (checkUser)
        return res
          .status(409)
          .send({ message: "This address email already exists." });

      // Save model in database.
      const savedUser: UserInterface = await this.user.save();
      // Destructure an object and get a token that is returned from the method generateAccessToken.
      const { token }: { token: string } = this.generateAccessToken(
        savedUser.id
      );
      // Response status 200 set header "Authorization" with token and send user json.
      res.status(200).header("Authorization", token).send(savedUser);
      // If is some error, catch and call the next function with an error argument in this case it will be error handler.
    } catch (err) {
      next(err);
    }
  };

  //Login user method.
  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    // Try catch block
    try {
      // Set variables from request body.
      const { email, password }: { email: string; password: string } = req.body;
      //Find user by email.
      const findUser = await UserModel.findOne({ email: email });
      // If the user does not exist, response 400 Bad Request, send the message.
      if (!findUser)
        return res.status(400).send({ message: "Email is not valid." });
      //Validate user password.
      const validPassword: boolean = await findUser.validatePassword(password);
      // If the password is not valid, response 400 Bad Request, send the message.
      if (!validPassword)
        return res.status(400).send({ message: "Password is not valid." });
      // Destructure an object and get a token that is returned from the method generateAccessToken.
      const { token }: { token: string } = this.generateAccessToken(
        findUser.id
      );
      // Response status 200 set header "Authorization" with token and send user json.
      res.status(200).header("Authorization", token).send({ user: findUser });
      // If is some error, catch and call the next function with an error argument in this case it will be error handler.
    } catch (err) {
      next(err);
    }
  };
}
