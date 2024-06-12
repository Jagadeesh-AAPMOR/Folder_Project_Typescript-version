import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
test("renders component 1", () => {
  const { getByText } = render(<Dashboard />);
  const linkElement = getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
