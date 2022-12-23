import { useContext } from "react";
import { LocalStorageContextType } from "../types/types";
import useLocalStorage from "./useLocalStorage";

export function useLocalStorageValue(
  context: React.Context<any>,
  key: string
): [string, (value: string) => void] | string {
  const value = useContext(context) as LocalStorageContextType;
  if (value === undefined) {
    const [storedValue, setStoredValue] = useLocalStorage(key, null);
    return [storedValue, setStoredValue];
  }
  return value;
}
