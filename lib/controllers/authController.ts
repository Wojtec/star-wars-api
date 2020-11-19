import { Request, Response } from "express";

export class AuthController {
  public singin(req: Request, res: Response) {
    res.send("singin");
  }

  public singup(req: Request, res: Response) {
    res.send("singup");
  }
}
