// Home.js
// import React from "react";
import Task from "./Task";
import Button from "./Button";
import { AiOutlinePlus } from "react-icons/Ai";
import { ThemeContext } from "./ThemeProvider";
import { useContext, useEffect, useState } from "react";
import TaskEditContainer from "./TaskEditorContainer";
import "flatpickr/dist/flatpickr.min.css";
import { DispatchContext } from "./TaskReducerProvider";

function TodayPage() {
  const { theme } = useContext(ThemeContext);
  const [showAddTask, setShowAddTask] = useState(false);
  const {taskState, dispatch} = useContext(DispatchContext);

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

  useEffect(() => {
    console.log("FIRST RENDER OF TODAYPAGE");
    dispatch({ type: "DELETE_TASK", payload: 4});
  }, []);

  return (
    <div className={`${theme} today-page`}>
      <h1 className="title">Today's Task</h1>

      <Task />

      {/* {showAddTask ? (
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
      )} */}

    </div>
  );
}

export default TodayPage;
