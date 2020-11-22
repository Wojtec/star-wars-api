import app from "./app";
import config from "./config";

const PORT: string = config.PORT;

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
