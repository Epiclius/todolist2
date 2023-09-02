// Home.js
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { BsCircleFill, BsFillCalendarDateFill } from "react-icons/Bs";
import { AiFillDelete, AiFillEdit } from "react-icons/Ai";
import Button from "./Button";
import { TaskInterface } from "./Task";
import { DispatchContext } from "./DispatchProvider";
import DescriptionInput from "./TaskDescriptionInput";
// React.Dispatch<ToggleTask>
// () => dispatch?.dispatch({ type: "EDIT", payload: Task})

export default function TaskEditContainer(Task: TaskInterface & { onClick?: () => void }) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div className={`task-edit-container ${theme}`}>
      <div className="edit-title">
        <DescriptionInput initialText={Task.title} />
      </div>
      {/* <p className={`description horiz-divider ${theme}`}>{Task.description}</p> */}
      
      <div className="description-text-area">
        <DescriptionInput initialText={Task.description} />
      </div>
      
      <div className="edit-box">
        <Button icon={<BsFillCalendarDateFill />}></Button>
        <Button icon={<AiFillDelete />}></Button>
        <Button
          text="Cancel"
          onClick={Task.onClick}
          extraClass="cancel-button"
        ></Button>

        <Button
          text="Save"
          onClick={undefined}
          extraClass="save-button"
        ></Button>
      </div>
    </div>
  );
}
