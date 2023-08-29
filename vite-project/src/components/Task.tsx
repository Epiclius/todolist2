// Home.js
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { BsCircleFill } from "react-icons/Bs";
import { AiFillEdit } from "react-icons/Ai";
import Button from "./Button";

function Task() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="task-container">
      <div className="task-container-buttons">
        <div className="name-check-box">
          <Button icon={<BsCircleFill />} extraClass="check-box"></Button>
          <span className="name">task</span>
        </div>
        <div className="edit-box">
          <Button icon={<AiFillEdit />} extraClass="check-box"></Button>
        </div>
      </div>

      <p className={`description horiz-divider ${theme}`}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, a quod
        aliquid voluptates
      </p>
    </div>
  );
}

export default Task;
