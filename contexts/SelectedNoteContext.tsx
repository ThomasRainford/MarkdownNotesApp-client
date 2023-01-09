import { createContext } from "react";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../utils/types/types";

export const SelectedNoteContext = createContext<
  LocalStorageContextType | undefined
>(undefined);

export function SelectedNoteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useLocalStorage(LocalStorageKeys.SELECTED_NOTE, null);

  return (
    <SelectedNoteContext.Provider value={value}>
      {children}
    </SelectedNoteContext.Provider>
  );
}
