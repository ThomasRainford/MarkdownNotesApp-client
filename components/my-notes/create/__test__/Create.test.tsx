import { render } from "@testing-library/react";
import Create from "../Create";

describe("Create component", () => {
  test("Displays the Create component", () => {
    const type = "collection";
    const tooltipLabel = "Add Collection";
    const onClick = jest.fn();

    render(
      <Create type={type} tooltipLabel={tooltipLabel} onClick={onClick} />
    );
  });
});
