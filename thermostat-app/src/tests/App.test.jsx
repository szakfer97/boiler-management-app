import { expect, test } from "vitest";
import App from "../components/App";

test("renders with one thermostat by default", () => {
  expect(<App />);
});
