import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";
import App from "./App";

test("renders learn react link", () => {
  render(
    <BrowserRouter basename="/react/demo">
      <ThemeContext>
        <App />
      </ThemeContext>
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
