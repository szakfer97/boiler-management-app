import { useState, useCallback } from "react";
import Thermostat from "./Thermostat";

export default function App() {
  const [numThermostats, setNumThermostats] = useState(1);
  const [thermostatIDs, setThermostatIDs] = useState([1]);

  const setThermostats = useCallback(() => {
    if (numThermostats > 9) {
      alert("9 is the maximum number of thermostats that can be displayed.");
      return;
    }
    const newIDs = Array.from(
      { length: numThermostats },
      (_, index) => index + 1
    );
    setThermostatIDs(newIDs);
  }, [numThermostats]);

  const resetThermostats = useCallback(() => {
    setNumThermostats(1);
    setThermostatIDs([1]);
  }, []);

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="text-center">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 mt-3">
          {thermostatIDs.map((id) => (
            <Thermostat key={id} id={id} />
          ))}
        </div>
        <div className="mt-4">
          <input
            type="number"
            value={numThermostats}
            onChange={(e) => setNumThermostats(parseInt(e.target.value, 10))}
            min={1}
            max={9}
            className="p-1 mr-2 text-center text-white bg-black hover:bg-gray-700 border border-white"
          />
          <button
            className="p-2 bg-black hover:bg-gray-600 text-white rounded border border-white"
            onClick={setThermostats}
          >
            Set number of thermostats
          </button>
          <button
            className="p-2 bg-gray-600 hover:bg-black text-white rounded ml-2 border border-white"
            onClick={resetThermostats}
          >
            Reset number of thermostats
          </button>
        </div>
      </div>
    </main>
  );
}
