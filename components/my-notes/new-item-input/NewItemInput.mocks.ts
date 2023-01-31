import { Props } from "./NewItemInput";

const base: Props = {
  type: "collection",
  confirmAdd: (title: string): void => {
    return;
  },
};

export const mockNewItemInputProps = {
  base,
};
