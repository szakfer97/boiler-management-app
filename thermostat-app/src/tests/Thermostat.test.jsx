import { expect, test } from "vitest";
import Thermostat from "../components/Thermostat";

test("renders one thermostat by default", () => {
  expect(<Thermostat />);
});
