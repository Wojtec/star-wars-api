import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { Routes } from "./routes";

class App {
  public app: express.Application = express();

  private Routes: Routes = new Routes();

  private uri: string =
    "mongodb+srv://star:star@cluster0.0gkej.mongodb.net/star?retryWrites=true&w=majority";

  constructor() {
    this.config();
    this.mongoSetup();
    this.Routes.auth(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private mongoSetup(): void {
    mongoose
      .connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Database is connected!"))
      .catch((err) => console.log(err));
  }
}
export default new App().app;
