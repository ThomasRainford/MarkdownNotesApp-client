import { useContext } from "react";
import { LocalStorageContextType } from "../types/types";
import useLocalStorage from "./useLocalStorage";

export function useLocalStorageValue(
  context: React.Context<LocalStorageContextType | undefined>,
  key: string
): [string, (_: string) => void] | string {
  const value = useContext(context);
  const [storedValue, setStoredValue] = useLocalStorage(key, null);
  if (value === undefined) {
    return [storedValue, setStoredValue];
  }
  return value;
}

// TODO: create new context for storing small desktop view pane visible
