// Home.js
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { AiFillDelete } from "react-icons/Ai";
import Button from "./Button";
import { TaskInterface } from "./Task";
import { DispatchContext } from "./TaskReducerProvider";
import DescriptionInput from "./TaskDescriptionInput";
import DatePicker from "./DatePicker";

// React.Dispatch<ToggleTask>
// () => dispatch?.dispatch({ type: "EDIT_TASK", payload: Task})

// export default function TaskEditContainer({ task, onClick }: { task: TaskInterface, onClick: () => void }) {

export default function TaskEditContainer({
  Task,
  toggle,
  forAddingTask,
}: {
  Task: TaskInterface;
  toggle: () => void;
  forAddingTask?: boolean;
}) {
  const { theme } = useContext(ThemeContext);

  const { taskState, dispatch } = useContext(DispatchContext);

  const [title, setTitle] = useState(Task.title);
  const [description, setDescription] = useState(Task.description);
  const [scheduleDateTime, setScheduleDateTime] = useState<Date | null>(
    Task.scheduleDateTime
  );
  const [proceedDisabled, setProceedDisabled] = useState("");

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
          onTextChange={handleTitleChange}
        />
      </div>

      <div className="description-text-area">
        <DescriptionInput
          initialText={Task.description}
          placeholder="Description"
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

        <DatePicker
          scheduleDateTime={Task.scheduleDateTime}
          onChange={handleScheduleChange}
        />

        <Button
          text="Cancel"
          extraClass="cancel-button"
          onClick={toggle}
        ></Button>

        <Button
          text={forAddingTask ? "Add Task" : "Save"}
          extraClass={`save-button ${proceedDisabled}`}
          onClick={proceedDisabled === "" ? handleProceedClick : () => {}}
        ></Button>
      </div>
    </div>
  );
}
