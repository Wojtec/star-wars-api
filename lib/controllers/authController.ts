import { Request, Response, NextFunction } from "express";
import UserModel, { userInterface } from "../models/userModel";
import { Utils } from "../utils/index";

import jwt from "jsonwebtoken";

export class AuthController {
  public utils: Utils = new Utils();
  //Register
  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    //Try catch block
    try {
      //Set variables from request body
      const { email, password }: { email: string; password: string } = req.body;
      //Set request body in model database
      const user: userInterface = new UserModel({
        email: email,
        password: password,
        hero: await this.utils.getHero(),
      });
      //Save model in database
      // const savedUser: object = await user.save();
      res.send(user);
    } catch (err) {
      next(err);
    }
  };

  //Login
  public signUp(req: Request, res: Response, next: NextFunction) {
    try {
      res.send("signup");
    } catch (err) {
      next(err);
    }
  }
}
