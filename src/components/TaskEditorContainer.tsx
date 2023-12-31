// Home.js
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { AiFillDelete } from "react-icons/Ai";
import Button from "./Button";
import { TaskInterface } from "./Task";
import { DispatchContext } from "./TaskReducerProvider";
import DescriptionInput from "./TaskDescriptionInput";
import DatePicker from "./DatePicker";
import { BiSolidFlag, BiSolidSave } from "react-icons/Bi";
import { MdAddTask, MdCancel } from "react-icons/Md";
import DropDrown from "./DropDownMenu";
import { WindowSizeContext } from "../App";

export default function TaskEditContainer({
  Task,
  toggle,
  forAddingTask,
}: {
  Task: TaskInterface;
  toggle: () => void;
  forAddingTask?: boolean;
}) {
  const isWindowSmall = useContext(WindowSizeContext);
  const { theme } = useContext(ThemeContext);

  const { dispatch } = useContext(DispatchContext);

  const [title, setTitle] = useState(Task.title);
  const [description, setDescription] = useState(Task.description);
  const [scheduleDateTime, setScheduleDateTime] = useState<Date | null>(
    Task.scheduleDateTime
  );
  const [proceedDisabled, setProceedDisabled] = useState("");

  const handlePrioritySelection = (item: string) => {
    Task.priority = item;
    console.log("priority: ", Task.priority);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);

    if (newTitle === "") {
      setProceedDisabled("disabled");
    } else {
      setProceedDisabled("");
    }
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleScheduleChange = (newSchedule: Date | null) => {
    setScheduleDateTime(newSchedule);
    console.log("newSchedule: ", newSchedule);
  };

  const handleProceedClick = () => {
    const task = {
      ...Task,
      title: title,
      description: description,
      scheduleDateTime: scheduleDateTime,
    };

    if (forAddingTask) {
      dispatch({ type: "ADD_TASK", payload: task });
    } else {
      dispatch({ type: "EDIT_TASK", payload: task });
    }

    toggle();
  };

  const handleDeleteClick = () => {
    console.log("handleDeleteClick");

    dispatch({ type: "DELETE_TASK", payload: Task.id });
    toggle();
  };

  useEffect(() => {
    if (forAddingTask) handleTitleChange(Task.title);
  }, []);

  return (
    <div className={`task-edit-container ${theme}`}>
      <div className="edit-title">
        <DescriptionInput
          initialText={Task.title}
          placeholder="Task title"
          textareaID={"titleTextArea"}
          onTextChange={handleTitleChange}
        />
      </div>

      <div className="description-text-area">
        <DescriptionInput
          initialText={Task.description}
          placeholder="Description"
          textareaID={"descriptionTextArea"}
          onTextChange={handleDescriptionChange}
        />
      </div>

      <div className="edit-box">
        {forAddingTask ? null : (
          <Button
            icon={<AiFillDelete />}
            onClick={handleDeleteClick}
            extraClass="delete-button"
          ></Button>
        )}

        <DropDrown
          icon={<BiSolidFlag />}
          defaultSelection={Task.priority}
          selection={["high", "medium", "low"]}
          select={handlePrioritySelection}
        />

        <DatePicker
          scheduleDateTime={Task.scheduleDateTime}
          onScheduleChange={handleScheduleChange}
        />

        <Button
          text={isWindowSmall ? "" : "Cancel"}
          icon={isWindowSmall ? <MdCancel /> : null}
          extraClass="cancel-button"
          onClick={toggle}
        ></Button>

        <Button
          text={isWindowSmall ? "" : forAddingTask ? "Add Task" : "Save"}
          icon={
            isWindowSmall ? (
              forAddingTask ? (
                <MdAddTask />
              ) : (
                <BiSolidSave />
              )
            ) : null
          }
          extraClass={`save-button ${proceedDisabled}`}
          onClick={proceedDisabled === "" ? handleProceedClick : () => {}}
        ></Button>
      </div>
    </div>
  );
}
