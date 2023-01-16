import { ReactNode } from "react";
import { SelectedCollectionProvider } from "../../contexts/SelectedCollectionContext";
import { SelectedListProvider } from "../../contexts/SelectedListContext";
import { SelectedNoteProvider } from "../../contexts/SelectedNoteContext";

interface Props {
  children: ReactNode;
}

const SelectedDataProvider = ({ children }: Props) => {
  return (
    <SelectedCollectionProvider>
      <SelectedListProvider>
        <SelectedNoteProvider>{children}</SelectedNoteProvider>
      </SelectedListProvider>
    </SelectedCollectionProvider>
  );
};

export default SelectedDataProvider;
