import { fireEvent, render } from "@testing-library/react";
import AddOrCancelAddItem from "../AddOrCancelAddItem";

describe("AddOrCancelAddItem component", () => {
  test("Displays the AddOrCancelAddItem component", () => {
    const { getByLabelText } = render(
      <AddOrCancelAddItem
        type="collection"
        tooltipLabel="Add Collection"
        iconType="add"
        onClick={jest.fn()}
      />
    );

    const addCollectionButton = getByLabelText("add-collection");
    expect(addCollectionButton).toBeInTheDocument();
  });

  test("Renders the cancel icon when 'iconType' prop is 'cancel'", () => {
    const { getByLabelText } = render(
      <AddOrCancelAddItem
        type="list"
        tooltipLabel="Cancel Adding List"
        iconType="cancel"
        onClick={jest.fn()}
      />
    );

    const cancelAddingListButton = getByLabelText("add-list");
    expect(cancelAddingListButton).toBeInTheDocument();
  });

  test("Calls the 'onClick' prop when the button is clicked", () => {
    const mockOnClick = jest.fn();

    const { getByLabelText } = render(
      <AddOrCancelAddItem
        type="note"
        tooltipLabel="Add Note"
        onClick={mockOnClick}
        iconType="add"
      />
    );

    const addNoteButton = getByLabelText("add-note");
    fireEvent.click(addNoteButton);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
