// Home.js
import React from "react";
import Task from "./Task";

function TodayPage() {
  return (
    <>
      <h2 className="title">Today Page</h2>

      <Task />
      <Task />
      <Task />
    </>
  );
}

export default TodayPage;