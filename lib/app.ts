import dotenv from "dotenv";
dotenv.config();
import config from "./config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { Routes } from "./routes";

class App {
  public app: express.Application = express();

  private routes: Routes = new Routes();

  constructor() {
    this.config();
    this.mongoSetup();
    //Routes
    this.routes.auth(this.app);
    this.routes.user(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private mongoSetup(): void {
    mongoose
      .connect(config.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => console.log("Database is connected!"))
      .catch((err) => console.log(err));
  }
}
export default new App().app;
