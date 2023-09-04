// Home.js
import { useEffect, useReducer, useState } from "react";
import TaskContainer from "./TaskContainer";
import { DispatchProvider } from "./TaskReducerProvider.tsx";
import TaskEditContainer from "./TaskEditorContainer";
import Button from "./Button.tsx";
import { AiOutlinePlus } from "react-icons/Ai";

// TO DO: the buttons in TaskContainer and TaskEditContainer should toggle the edit container

export default function Task() {
  const [taskState, dispatch] = useReducer(taskReducer, { tasks: [] });

  const [editModes, setEditModes] = useState(taskState.tasks.map(() => false));
  const [showAddTask, setShowAddTask] = useState(false);

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const newTaskID = Math.max(...taskState.tasks.map((task) => task.id), 0) + 1;
  console.log("newTaskID: ", newTaskID);

  const dummyTask = {
    id: newTaskID,
    title: "",
    description: "",
    priority: 1,
    scheduleDateTime: null,
  };

  const toggleEditContainer = (taskId: number) => {
    console.log("clicked: " + taskId);
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
    scheduleDateTime: new Date("2023-09-05T14:10:00"),
  };
  const newTask2: TaskInterface = {
    id: 2,
    title: "Clean your room",
    description: "Clean your room",
    priority: 1,
    scheduleDateTime: null,
  };

  console.log("taskState.tasks:", taskState.tasks);

  useEffect(() => {
    dispatch({ type: "ADD_TASK", payload: newTask });
    dispatch({ type: "ADD_TASK", payload: newTask2 });
  }, []);

  // useEffect(() => {
  //   console.log("Task: taskState.tasks:", taskState.tasks);
  // }, [taskState]);

  return (
    <DispatchProvider taskState={taskState} dispatch={dispatch}>
      <ul className="task-list">
        {taskState.tasks.map((task, index) =>
          editModes[index] ? (
            <TaskEditContainer
              key={task.id}
              Task={task}
              toggle={() => toggleEditContainer(index)}
            />
          ) : (
            <TaskContainer
              key={task.id}
              Task={task}
              toggle={() => toggleEditContainer(index)}
            />
          )
        )}
      </ul>

      {showAddTask ? (
        <TaskEditContainer
          forAddingTask={true}
          Task={dummyTask}
          toggle={toggleAddTask}
        />
      ) : (
        <Button
          extraClass="add-task-btn"
          icon={<AiOutlinePlus />}
          text={"Add task"}
          onClick={toggleAddTask}
        ></Button>
      )}
    </DispatchProvider>
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
  scheduleDateTime: Date | null;
}

export type ToggleTask =
  | { type: "EDIT_TASK"; payload: TaskInterface }
  | { type: "ADD_TASK"; payload: TaskInterface }
  | { type: "DELETE_TASK"; payload: number };

function taskReducer(state: taskState, action: ToggleTask): taskState {
  switch (action.type) {
    case "EDIT_TASK":
      console.log("EDIT_TASK");
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              title: action.payload.title,
              description: action.payload.description,
              priority: action.payload.priority,
              scheduleDateTime: action.payload.scheduleDateTime,
            };
          } else {
            return task;
          }
        }),
      };
    case "ADD_TASK":
      console.log("ADD_TASK");
      return {
        tasks: state.tasks.concat(action.payload),
      };
    case "DELETE_TASK":
      console.log("DELETE_TASK");
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      throw new Error("Invalid toggle type");
  }
}
