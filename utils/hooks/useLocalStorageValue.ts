import { useContext } from "react";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import { LocalStorageContextType } from "../types/types";
import useLocalStorage from "./useLocalStorage";

export function useLocalStorageValue<T extends string>(
  key: string
): [string, (value: T) => void] | string {
  const value = useContext(
    LocalStorageContext
  ) as unknown as LocalStorageContextType<T>;
  if (value === undefined) {
    const [storedValue, setStoredValue] = useLocalStorage<T>(key, null);
    return [storedValue, setStoredValue];
  }
  return value;
}
