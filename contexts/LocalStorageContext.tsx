import { createContext } from "react";
import useLocalStorage from "../utils/hooks/useLocalStorage";

export const LocalStorageContext = createContext<
  [string, (value: string) => void] | undefined
>(undefined);

export function LocalStorageProvider({
  storageKey,
  children,
}: {
  storageKey: string;
  children: React.ReactNode;
}) {
  const value = useLocalStorage<string>(storageKey, null);

  return (
    <LocalStorageContext.Provider value={value}>
      {children}
    </LocalStorageContext.Provider>
  );
}
