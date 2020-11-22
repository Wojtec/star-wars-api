import { Request, Response, NextFunction } from "express";
import UserModel, { userInterface } from "../models/userModel";
import config from "../config";
import { Utils } from "../utils/index";
import jwt from "jsonwebtoken";

interface tokenInterface {
  token: string;
  type: string;
  expiresIn: number;
}

export class AuthController {
  private utils: Utils = new Utils();
  private user: userInterface = new UserModel();
  private tokenExpires: number = 60 * 60 * 24;

  // Generate access token
  public generateAccessToken = (id: string) => {
    const token: string = jwt.sign({ _id: id }, config.secret, {
      algorithm: "HS256",
      expiresIn: this.tokenExpires,
    });

    return { token, type: "Bearer", expiresIn: this.tokenExpires };
  };

  //Register
  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    //Try catch block
    try {
      //Set variables from request body
      const { email, password }: { email: string; password: string } = req.body;
      //Set request body in model database
      this.user.email = email;
      this.user.password = await this.user.encryptPassword(password);
      this.user.hero = await this.utils.getHero();
      //Save model in database
      const savedUser: userInterface = await this.user.save();
      const { token }: { token: string } = this.generateAccessToken(
        savedUser.id
      );
      res.status(200).header("Authorization", token).send(savedUser);
    } catch (err) {
      next(err);
    }
  };

  //Login
  public signIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      //Find user by email.
      const findUser = await UserModel.findOne({ email: email });
      if (!findUser) return res.status(400).send("Email is not valid.");
      //Validate user password.
      const validPassword: boolean = await findUser.validatePassword(password);
      if (!validPassword) return res.status(400).send("Password is not valid.");
      //Get token
      const token: tokenInterface = this.generateAccessToken(findUser.id);
      res
        .status(200)
        .header("Authorization", token.token)
        .send({ user: findUser });
    } catch (err) {
      next(err);
    }
  };
}
