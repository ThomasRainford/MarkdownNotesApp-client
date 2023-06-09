import { useContext } from "react";
import { LocalStorageContextType } from "../types/types";

export function useLocalStorageValue(
  context: React.Context<LocalStorageContextType | undefined>
): LocalStorageContextType | undefined {
  const value = useContext(context);
  return value;
}
