// Home.js
import { useContext, useState, useRef } from "react";
import { ThemeContext } from "./ThemeProvider";
import { BsCircle, BsCheck2Circle } from "react-icons/Bs";
import { AiFillDelete, AiFillEdit } from "react-icons/Ai";
import Button from "./Button";
import { TaskInterface } from "./Task";
import { DispatchContext } from "./TaskReducerProvider";
import flatpickr from "flatpickr";

export default function TaskContainer({
  Task,
  toggle,
}: {
  Task: TaskInterface;
  toggle: () => void;
}) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);
  const [checkHoverState, setState] = useState({ isHovered: false });

  const handleMouseEnter = () => {
    console.log("handleMouseEnter")
    setState({ isHovered: true });
  };

  const handleMouseLeave = () => {
    console.log("handleMouseLeave");
    setState({ isHovered: false });
  };

  return (
    <div className={`${theme} task-container`}>
      <div className="task-container-buttons">
        <div className="name-check-box">
          <Button
            icon={checkHoverState.isHovered ? <BsCheck2Circle /> : <BsCircle />}
            extraClass={`check-box ${
              checkHoverState.isHovered ? "hovered" : ""
            }`}
            onMouseEvents={{
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
            }}
            onClick={() =>
              dispatch?.dispatch({ type: "DELETE_TASK", payload: Task.id })
            }
          ></Button>
          <span className="name">{Task.title}</span>
        </div>
        <div className="edit-box">
          <Button icon={<AiFillEdit />} onClick={toggle}></Button>

          <Button
            icon={<AiFillDelete />}
            onClick={() =>
              dispatch?.dispatch({ type: "DELETE_TASK", payload: Task.id })
            }
          ></Button>
        </div>
      </div>

      <p className={`description horiz-divider`}>{Task.description}</p>
    </div>
  );
}
