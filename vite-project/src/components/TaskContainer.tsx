// Home.js
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { BsCircleFill, BsFillCalendarDateFill } from "react-icons/Bs";
import { AiFillDelete, AiFillEdit } from "react-icons/Ai";
import Button from "./Button";
import { TaskInterface } from "./Task";
import { DispatchContext } from "./DispatchProvider";
// React.Dispatch<ToggleTask>
// () => dispatch?.dispatch({ type: "EDIT", payload: Task})
export default function TaskContainer(Task: TaskInterface & { onClick?: () => void }) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div className="task-container">
      <div className="task-container-buttons">
        <div className="name-check-box">
          <Button icon={<BsCircleFill />} extraClass="check-box"></Button>
          <span className="name">{Task.title}</span>
        </div>
        <div className="edit-box">
          <Button
            icon={<AiFillEdit />}
            onClick={Task.onClick}
          ></Button>
          <Button
            icon={<BsFillCalendarDateFill />}
          
          ></Button>
          <Button icon={<AiFillDelete />}></Button>
        </div>
      </div>

      <p className={`description horiz-divider ${theme}`}>{Task.description}</p>
    </div>
  );
}