import { render } from "@testing-library/react";
import AddOrCancelAddItem from "../AddOrCancelAddItem";

describe("Create component", () => {
  test("Displays the Create component", () => {
    const type = "collection";
    const tooltipLabel = "Add Collection";
    const onClick = jest.fn();

    render(
      <AddOrCancelAddItem
        type={type}
        tooltipLabel={tooltipLabel}
        onClick={onClick}
      />
    );
  });
});
