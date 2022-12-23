import { createContext } from "react";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { LocalStorageKeys } from "../utils/types/types";

export const SelectedListContext = createContext<
  [string, (value: string) => void] | undefined
>(undefined);

export function SelectedListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useLocalStorage<string>(LocalStorageKeys.SELECTED_LIST, null);

  return (
    <SelectedListContext.Provider value={value}>
      {children}
    </SelectedListContext.Provider>
  );
}
