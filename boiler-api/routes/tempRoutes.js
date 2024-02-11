import express from "express";
import { Temperature } from "../models/tempModel.js";
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.currentTemp ||
      !request.body.targetTemp ||
      !request.body.operatingMode
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: currentTemp, targetTemp, operatingMode",
      });
    }
    const newTemp = {
      currentTemp: request.body.currentTemp,
      targetTemp: request.body.targetTemp,
      operatingMode: request.body.operatingMode,
    };

    const temp = await Temperature.create(newTemp);

    return response.status(201).send(temp);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const temps = await Temperature.find({});

    return response.status(200).json({
      count: temps.length,
      data: temps,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const temp = await Temperature.findById(id);

    return response.status(200).json(temp);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.currentTemp ||
      !request.body.targetTemp ||
      !request.body.operatingMode
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: currentTemp, targetTemp, operatingMode",
      });
    }

    const { id } = request.params;

    const result = await Temperature.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Temperatures not found" });
    }

    return response
      .status(200)
      .send({ message: "Temperatures updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Temperature.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Temperatures not found" });
    }

    return response
      .status(200)
      .send({ message: "Temperatures deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
