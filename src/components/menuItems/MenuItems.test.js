import React from "react";
import { render } from "@testing-library/react";

import { Login } from "./Login";
test("renders component 1", () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
