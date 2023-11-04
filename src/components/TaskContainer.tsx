// Home.js
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { BsCircle, BsCheck2Circle } from "react-icons/Bs";
import { AiFillDelete, AiFillEdit } from "react-icons/Ai";
import { BiSolidFlag } from "react-icons/Bi";
import Button from "./Button";
import { TaskInterface } from "./Task";
import { DispatchContext } from "./TaskReducerProvider";
import DropDrown from "./DropDownMenu";

interface TaskContainerProps {
  Task: TaskInterface;
  toggle: () => void;
}

export default function TaskContainer({ Task, toggle }: TaskContainerProps) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);
  const [checkHoverState, setState] = useState({ isHovered: false });

  const handlePrioritySelection = (item: string) => {
    Task.priority = item;

    const storedTasks = JSON.parse(localStorage.getItem("tasks") ?? "[]");
    const taskIndex = storedTasks.findIndex(
      (task: TaskInterface) => task.id === Task.id
    );
    storedTasks[taskIndex].priority = item;
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    console.log("priority: ", Task.priority);
  };

  const handleMouseEnter = () => {
    console.log("handleMouseEnter");
    setState({ isHovered: true });
  };

  const handleMouseLeave = () => {
    console.log("handleMouseLeave");
    setState({ isHovered: false });
  };

  useEffect(() => {
      const isMobile =
        /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (isMobile) {
        console.log("This is a mobile device.");
        
      } else {
        console.log("This is not a mobile device.");
      }
    }, []);

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
          <DropDrown
            icon={<BiSolidFlag />}
            defaultSelection={Task.priority}
            selection={["high", "medium", "low"]}
            select={handlePrioritySelection}
          />
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
