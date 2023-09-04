import React, { createContext } from "react";
import { TaskInterface, ToggleTask } from "./Task";

type taskState = {
  tasks: TaskInterface[];
};

interface DispatchProviderProps {
  children: React.ReactNode;
  taskState: taskState;
  dispatch: React.Dispatch<ToggleTask>;
}

interface DispatchContextType {
  taskState: taskState;
  dispatch: React.Dispatch<ToggleTask>;
}


const defaultDispatchContext: DispatchContextType = {
  taskState: { tasks: [] },
  dispatch: () => {},
};

export const DispatchContext = createContext<DispatchContextType>(
  defaultDispatchContext
);


export function DispatchProvider({
  children,
  dispatch,
  taskState,
}: DispatchProviderProps) {
  return (
    <DispatchContext.Provider value={{ dispatch: dispatch, taskState: taskState }}>
      {children}
    </DispatchContext.Provider>
  );
}
