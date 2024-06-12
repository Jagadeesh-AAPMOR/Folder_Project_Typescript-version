import React from "react";
import { render } from "@testing-library/react";

import Register from "./Register";
test("renders component 1", () => {
  const { getByText } = render(<Register />);
  const linkElement = getByText(/Register/i);
  expect(linkElement).toBeInTheDocument();
});
