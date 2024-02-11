import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Temperature } from "./models/tempModel.js";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Boiler system backend");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
