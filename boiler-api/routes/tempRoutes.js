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
    let tableHtml =
      "<table style='border-collapse: collapse; width: 100%;'><tr style='background-color: #f2f2f2;'><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Current Temp</th><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Target Temp</th><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Operating Mode</th></tr>";
    temps.forEach((temp) => {
      tableHtml += `<tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>${temp.currentTemp}</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>${temp.targetTemp}</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>${temp.operatingMode}</td></tr>`;
    });
    tableHtml += "</table>";

    return response.status(200).send(tableHtml);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const temp = await Temperature.findById(id);
    const tableHtml = `<table style='border-collapse: collapse; width: 100%;'><tr style='background-color: #f2f2f2;'><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Current Temp</th><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Target Temp</th><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Operating Mode</th></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>${temp.currentTemp}</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>${temp.targetTemp}</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>${temp.operatingMode}</td></tr></table>`;
    return response.status(200).send(tableHtml);
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
