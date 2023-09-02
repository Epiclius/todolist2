// Home.js
// import React from "react";
import Task from "./Task";
import Button from "./Button";
import { AiOutlinePlus } from "react-icons/Ai";

function TodayPage() {
  return (
    <div className="todayPage">
      <h2 className="title">Today Page</h2>

      <Task />

      <Button
        extraClass="add-task-btn"
        icon={<AiOutlinePlus />}
        text={"Add task"}
      ></Button>
    </div>
  );
}

export default TodayPage;