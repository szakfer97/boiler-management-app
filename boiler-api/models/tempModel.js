import mongoose from "mongoose";

const tempSchema = mongoose.Schema({
  currentTemp: {
    type: Number,
    required: true,
  },
  targetTemp: {
    type: Number,
    required: true,
  },
  operatingMode: {
    type: String,
    required: true,
  },
});

export const Temperature = mongoose.model("Temp", tempSchema);
