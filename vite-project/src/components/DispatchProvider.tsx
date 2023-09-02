import React, { createContext, useContext } from "react";
import { ToggleTask } from "./Task";

interface DispatchContextType {
  dispatch: React.Dispatch<ToggleTask>;
}

export const DispatchContext = createContext<DispatchContextType | undefined>(
  undefined
);

export function DispatchProvider({
  children,
  dispatch,
}: {
  children: React.ReactNode;
  dispatch: React.Dispatch<ToggleTask>;
}) {
  return (
    <DispatchContext.Provider value={{ dispatch }}>
      {children}
    </DispatchContext.Provider>
  );
}
