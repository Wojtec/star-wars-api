import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { Auth } from "./routes/auth";

class App {
  public app: express.Application = express();
  //Routes
  private authRoute: Auth = new Auth();

  private uri =
    "mongodb+srv://star:star@cluster0.0gkej.mongodb.net/star?retryWrites=true&w=majority";

  constructor() {
    this.config();
    this.mongoSetup();
    this.authRoute.route(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose
      .connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Database is connected!"))
      .catch((err) => console.log(err));
  }
}
export default new App().app;
