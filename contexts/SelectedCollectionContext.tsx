import { createContext } from "react";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../utils/types/types";

export const SelectedCollectionContext = createContext<
  LocalStorageContextType | undefined
>(undefined);

export function SelectedCollectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useLocalStorage(LocalStorageKeys.SELECTED_COLLECTION, null);

  return (
    <SelectedCollectionContext.Provider value={value}>
      {children}
    </SelectedCollectionContext.Provider>
  );
}
