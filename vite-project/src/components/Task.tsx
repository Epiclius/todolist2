// Home.js
import { useEffect, useReducer, useState } from "react";
import TaskContainer from "./TaskContainer";
import { DispatchContext } from "./DispatchProvider";
import TaskEditContainer from "./TaskEditContainer";


// TO DO: the buttons in TaskContainer and TaskEditContainer should toggle the edit container

export default function Task() {
  const [taskState, dispatch] = useReducer(taskReducer, { tasks: [] });

  const [editModes, setEditModes] = useState(taskState.tasks.map(() => false));

  const toggleEditContainer = (taskId: number) => {
    console.log("clicked: " + taskId )
    setEditModes((prev) => {
      const newEditModes = [...prev];
      newEditModes[taskId] = !newEditModes[taskId];
      return newEditModes;
    });
  };

  const newTask: TaskInterface = {
    id: 1,
    title: "Clean your room",
    description: "Clean your room",
    priority: 1,
  };
  const newTask2: TaskInterface = {
    id: 2,
    title: "Clean your room",
    description: "Clean your room",
    priority: 1,
  };

  useEffect(() => {
    dispatch({ type: "ADD_TASK", payload: newTask });
    dispatch({ type: "ADD_TASK", payload: newTask2 });
  }, []);

  return (
    <DispatchContext.Provider value={{ dispatch }}>
      <ul className="task-list">
        {taskState.tasks.map((task, index) =>
          editModes[index] ? (
            <TaskEditContainer
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              onClick={() => toggleEditContainer(index)}
            />
          ) : (
            <TaskContainer
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              onClick={() => toggleEditContainer(index)}
            />
          )
        )}
      </ul>
    </DispatchContext.Provider>
  );
}

interface taskState {
  tasks: TaskInterface[];
}

export interface TaskInterface {
  id: number;
  title: string;
  description: string;
  priority: number;
}

export type ToggleTask =
  | { type: "EDIT"; payload: TaskInterface }
  | { type: "ADD_TASK"; payload: TaskInterface }
  | { type: "DELETE_TASK"; payload: TaskInterface };

function taskReducer(state: taskState, action: ToggleTask): taskState {
  switch (action.type) {
    case "EDIT":
      console.log("EDITING: ", action.payload.id);
      return { ...state };
    case "ADD_TASK":
      return {
        tasks: [
          ...state.tasks,
          {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            priority: action.payload.priority,
          },
        ],
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    default:
      throw new Error("Invalid toggle type");
  }
}
