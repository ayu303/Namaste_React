import { render } from "@testing-library/react";
import Contact from "../Contact";

it("should render contact component", () => {
  const { getByText } = render(<Contact />);
  const contactElement = getByText("Contact at - 7355583303");
  expect(contactElement).toBeInTheDocument();
});
