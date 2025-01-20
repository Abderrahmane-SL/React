import { useState , useEffect } from "react";

export function useLocalStorage(initilalState , key) {
  const [Value, setValue] = useState(function () {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initilalState;
  });
  useEffect(function () {
    localStorage.setItem(key, JSON.stringify(Value));
  }, [key , Value]);
    return [Value, setValue];
}