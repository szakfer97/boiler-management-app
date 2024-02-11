import { expect, test, describe, render, fireEvent } from "vitest";
import Thermostat from "./Thermostat";
import App from "./App";

describe("Thermostat component", () => {
  test("renders with initial temperature and target temperature", () => {
    render(<Thermostat id={1} />);
    expect(screen.getByText(/Current temperature: 20°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Target temperature: 20°C/i)).toBeInTheDocument();
  });

  test("increases and decreases temperature correctly", () => {
    render(<Thermostat id={1} />);
    fireEvent.click(screen.getByText(/Echo \+/i));
    fireEvent.click(screen.getByText(/Boost \+/i));
    expect(screen.getByText(/Target temperature: 24.5°C/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Normal -/i));
    fireEvent.click(screen.getByText(/Boost -/i));
    expect(screen.getByText(/Target temperature: 19.5°C/i)).toBeInTheDocument();
  });
});

describe("App component", () => {
  test("renders with one thermostat by default", () => {
    render(<App />);
    expect(
      screen.getAllByRole("heading", { name: /Thermostat/i })
    ).toHaveLength(1);
  });

  test("adds thermostats correctly", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: 3 } });
    fireEvent.click(screen.getByText(/Set number of thermostats/i));
    expect(
      screen.getAllByRole("heading", { name: /Thermostat/i })
    ).toHaveLength(3);
  });
});
