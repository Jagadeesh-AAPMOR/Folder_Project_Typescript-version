import React from "react";
import { render } from "@testing-library/react";
import VerifyOtp from "./VerifyOtp";

test("renders component 1", () => {
  const { getByText } = render(<VerifyOtp />);
  const linkElement = getByText(/VerifyOtp/i);
  expect(linkElement).toBeInTheDocument();
});
