import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Boiler system backend");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
