/**
 *
 * ENV CONFIG
 *
 **/

// Config file for the process environment if the project will be in production all OR operators with strings will be deleted.
export = {
  secret: process.env.TOKEN_SECRET || "cookie",
  PORT: process.env.PORT || "3000",
  DB_URI:
    process.env.DB_URI ||
    "mongodb+srv://star:star@cluster0.0gkej.mongodb.net/star?retryWrites=true&w=majority",
  API_PATH: process.env.API_PATH || "http://swapi.dev/api/",
};
