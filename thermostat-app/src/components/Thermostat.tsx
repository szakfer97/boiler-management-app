import React, { useEffect, useState } from "react";
import axios from "axios";

interface ThermostatProps {
  id: number;
}

interface TimeZone {
  start: string;
  end: string;
  targetTemperature: number;
}

const Thermostat: React.FC<ThermostatProps> = ({ id }) => {
  const getRandomTemperature = () => {
    return ((Math.floor(Math.random() * 13) + 25) * 0.5).toFixed(1);
  };

  const [initialTemperature] = useState<number>(
    parseInt(getRandomTemperature())
  );

  useEffect(() => {
    setTemperature(initialTemperature);
  }, [initialTemperature]);

  const [temperature, setTemperature] = useState(initialTemperature);
  const [operatingMode, setOperatingMode] = useState("");
  const [timeZones, setTimeZones] = useState<TimeZone[]>([]);
  const [newTimeZone, setNewTimeZone] = useState<TimeZone>({
    start: "",
    end: "",
    targetTemperature: 20,
  });

  useEffect(() => {
    const dataToBackend = async () => {
      try {
        await axios.post("http://localhost:5555/temps", {
          operatingMode,
          currentTemp: initialTemperature,
          targetTemp: temperature,
        });
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }
    };

    if (operatingMode) {
      dataToBackend();
    }
  }, [operatingMode, initialTemperature, temperature]);

  const resetTemperature = () => {
    setTemperature(initialTemperature);
  };

  const handleTemperatureChange = (amount: number) => {
    if (amount === 1.5) {
      setOperatingMode("Echo");
    } else if (amount === 2) {
      setOperatingMode("Normal");
    } else if (amount === 3) {
      setOperatingMode("Boost");
    }
    setTemperature((prevTemp) => prevTemp + amount);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setNewTimeZone((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTimeZone = () => {
    if (!newTimeZone.start || !newTimeZone.end) {
      alert("Please enter both start and end times for the time zone.");
      return;
    }

    setTimeZones((prevTimeZones) => [...prevTimeZones, newTimeZone]);
    setNewTimeZone({ start: "", end: "", targetTemperature: 20 });
  };

  const handleRemoveTimeZones = () => {
    setTimeZones([]);
  };

  return (
    <div className="border p-4 space-y-2">
      <h1 className="font-bold text-center">Thermostat {id}</h1>
      <div className="flex justify-center space-x-2">
        <button
          className="p-2 bg-green-500 hover:bg-green-700 text-white rounded mx-2"
          onClick={() => handleTemperatureChange(-1.5)}
        >
          Echo -
        </button>
        <button
          className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded mx-2"
          onClick={() => handleTemperatureChange(-2)}
        >
          Normal -
        </button>
        <button
          className="p-2 bg-red-500 hover:bg-red-700 text-white rounded mx-2"
          onClick={() => handleTemperatureChange(-3)}
        >
          Boost -
        </button>
        <button
          className="p-2 bg-green-500 hover:bg-green-700 text-white rounded mx-2"
          onClick={() => handleTemperatureChange(1.5)}
        >
          Echo +
        </button>
        <button
          className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded mx-2"
          onClick={() => handleTemperatureChange(2)}
        >
          Normal +
        </button>
        <button
          className="p-2 bg-red-500 hover:bg-red-700 text-white rounded mx-2"
          onClick={() => handleTemperatureChange(3)}
        >
          Boost +
        </button>
      </div>
      <div className="flex justify-between">
        <h2 className="font-bold">
          Current temperature: {initialTemperature}°C
        </h2>
        <h3 className="font-bold">Target temperature: {temperature}°C</h3>
      </div>
      <div>
        <h4 className="py-1 font-bold">Time Zones:</h4>
        {timeZones.map((timeZone, index) => (
          <div key={index}>
            <p>
              {timeZone.start} - {timeZone.end}: {timeZone.targetTemperature}
              °C
            </p>
          </div>
        ))}
        <div className="flex items-center justify-center space-x-2">
          <input
            type="time"
            value={newTimeZone.start}
            onChange={(e) => handleInputChange(e, "start")}
            className="p-2 border rounded bg-gray-400 text-black"
          />
          <span className="mx-2">-</span>
          <input
            type="time"
            value={newTimeZone.end}
            onChange={(e) => handleInputChange(e, "end")}
            className="p-2 border rounded bg-gray-400 text-black"
          />
          <input
            type="number"
            value={newTimeZone.targetTemperature}
            onChange={(e) => handleInputChange(e, "targetTemperature")}
            min={0}
            max={30}
            className="p-2 border rounded bg-gray-400 text-black text-center"
          />
        </div>
      </div>
      <div className="mt-2 flex justify-center space-x-2">
        <button
          className="p-2 bg-gray-500 hover:bg-black text-white rounded"
          onClick={() => resetTemperature()}
        >
          Reset target temperature
        </button>
        <button
          onClick={handleAddTimeZone}
          className="p-2 bg-gray-500 hover:bg-black text-white rounded"
        >
          Add time zone
        </button>
        <button
          onClick={handleRemoveTimeZones}
          className="p-2 bg-gray-500 hover:bg-black text-white rounded"
        >
          Remove time zones
        </button>
      </div>
    </div>
  );
};

export default Thermostat;
