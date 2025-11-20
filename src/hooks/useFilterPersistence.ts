import { useState, useEffect } from "react";

const STORAGE_KEY_PREFIX = "user_listing_filter_";

export const useFilterPersistence = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const storageKey = `${STORAGE_KEY_PREFIX}${key}`;

  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${storageKey}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${storageKey}":`, error);
    }
  }, [storageKey, value]);

  return [value, setValue];
};

