/**
 *
 * ENV CONFIG
 *
 **/

export = {
  secret: process.env.TOKEN_SECRET || "cookie",
  PORT: process.env.PORT || "3000",
  DB_URI:
    process.env.DB_URI ||
    "mongodb+srv://star:star@cluster0.0gkej.mongodb.net/star?retryWrites=true&w=majority",
};
