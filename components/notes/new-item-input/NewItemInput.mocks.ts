import { Props } from "./NewItemInput";

const base: Props = {
  type: "collection",
  confirmAdd: (_: string): void => {
    return;
  },
};

export const mockNewItemInputProps = {
  base,
};
