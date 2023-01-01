import { useContext } from "react";
import { LocalStorageContextType } from "../types/types";
import useLocalStorage from "./useLocalStorage";

export function useLocalStorageValue(
  context: React.Context<LocalStorageContextType | undefined>,
  key: string
): [string, (value: string) => void] | string {
  const value = useContext(context);
  if (value === undefined) {
    const [storedValue, setStoredValue] = useLocalStorage(key, null);
    return [storedValue, setStoredValue];
  }
  return value;
}
