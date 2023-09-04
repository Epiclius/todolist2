// Home.js
// import React from "react";
import Task from "./Task";
import { ThemeContext } from "./ThemeProvider";
import { useContext, useEffect } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { DispatchContext } from "./TaskReducerProvider";

function TodayPage() {
  const { theme } = useContext(ThemeContext);
  const {taskState, dispatch} = useContext(DispatchContext);

  const newTaskID = Math.max(...taskState.tasks.map((task) => task.id), 0) + 1;
  console.log("newTaskID: ", newTaskID);


  useEffect(() => {
    console.log("FIRST RENDER OF TODAYPAGE");
    dispatch({ type: "DELETE_TASK", payload: 4});
  }, []);

  return (
    <div className={`${theme} today-page`}>
      <h1 className="title">Today's Task</h1>

      <Task />
    </div>
  );
}

export default TodayPage;
