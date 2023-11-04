// Home.js
import { useContext, useEffect, useReducer, useState } from "react";
import TaskContainer from "./TaskContainer";
import { DispatchProvider } from "./TaskReducerProvider.tsx";
import TaskEditContainer from "./TaskEditorContainer";
import Button from "./Button.tsx";
import { AiOutlinePlus } from "react-icons/Ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "./ThemeProvider.tsx";

export default function Task() {
  const { theme } = useContext(ThemeContext);
  const [taskState, dispatch] = useReducer(taskReducer, { tasks: [] });
  const [editModes, setEditModes] = useState(taskState.tasks.map(() => false));
  const [showAddTask, setShowAddTask] = useState(false);

  const tasksToast = (message: string) => {
    console.log("generating toast for stored task");
    toast(message, {
      toastId: 2,
      theme: theme === "" ? "light" : "dark",
    });
  };

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const newTaskID = Math.max(...taskState.tasks.map((task) => task.id), 0) + 1;
  console.log("newTaskID: ", newTaskID);

  const addendTask = {
    id: newTaskID,
    title: "",
    description: "",
    priority: "high",
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

  useEffect(() => {

    
    
    // localStorage.clear();
    

    
    console.log("loading tasks from local storage");
    const storedTasks = JSON.parse(localStorage.getItem("tasks") ?? "[]");
    dispatch({ type: "ADD_TASK", payload: storedTasks });
    if (storedTasks.length === 0) {
      tasksToast("No stored tasks found");
    } else {
      tasksToast(`${storedTasks.length} tasks loaded`);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskState.tasks));
  }, [taskState]);

  return (
    <DispatchProvider taskState={taskState} dispatch={dispatch}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        className={`toast-override`}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
          Task={addendTask}
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
  priority: string;
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
