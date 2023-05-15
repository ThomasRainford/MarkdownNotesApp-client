import { createContext } from "react";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { LocalStorageContextType } from "../utils/types/types";

export const MyNotesSmallDesktopViewPaneVisibleContext = createContext<
  LocalStorageContextType | undefined
>(undefined);

export function MyNotesSmallDesktopViewPaneVisibleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useLocalStorage("sdv-pane-visible", null);

  return (
    <MyNotesSmallDesktopViewPaneVisibleContext.Provider value={value}>
      {children}
    </MyNotesSmallDesktopViewPaneVisibleContext.Provider>
  );
}
