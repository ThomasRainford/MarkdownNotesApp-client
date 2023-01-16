import { createContext } from "react";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../utils/types/types";

export const SelectedListContext = createContext<
  LocalStorageContextType | undefined
>(undefined);

export function SelectedListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useLocalStorage(LocalStorageKeys.SELECTED_LIST, null);

  return (
    <SelectedListContext.Provider value={value}>
      {children}
    </SelectedListContext.Provider>
  );
}
