import { useEffect, useState } from "react";

const useLocalStorage = (
  key: string,
  initialValue: string | null
): [string, (_: string) => void] => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      // Get from local storage by key
      if (typeof window === "undefined") return;
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue || "";
    } catch (error) {
      // If error also return initialValue
      // TODO: Handle error.
      console.error(error);
      return initialValue || "";
    }
  });

  // Use effect to update local storage when value changes
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      // Save state
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // TODO: Handle error.
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
