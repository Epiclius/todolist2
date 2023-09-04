import { useContext, useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { ThemeContext } from "./ThemeProvider";
import { BsFillCalendarDateFill } from "react-icons/Bs";
import Button from "./Button";
import { FaTimes } from "react-icons/Fa";

// require("flatpickr/dist/themes/dark.css");

interface Props {
  scheduleDateTime: Date | null;
  onChange: (newDate: Date | null) => void;
}

const DatePicker = ({ scheduleDateTime, onChange }: Props) => {
  const datePickerRef = useRef(null);
  const { theme, dummy } = useContext(ThemeContext);

  console.log("dummy inside datepicker:", dummy);

  // State variable to hold the selected date (including a "No Date" option)
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    scheduleDateTime === null ? null : new Date(scheduleDateTime)
  ); // Initialize as null to represent "No Date"

  useEffect(() => {
    if (datePickerRef.current) {
      const options = {
        enableTime: true,
        dateFormat: "M j, Y h:i K",
        minDate: "today",
        defaultDate: selectedDate ? selectedDate : "",
        onClose: function (selectedDates: Date[]) {
          setSelectedDate(selectedDates[0] || null); // Update to the selected date or null
          onChange(selectedDates[0] || null);
          console.log("selectedDates:", selectedDates[0] || null);
        },
      };

      flatpickr(datePickerRef.current, options);
    }
  }, [selectedDate]);

  // Function to handle cancel button click
  const handleCancelClick = () => {
    setSelectedDate(null); // Set selectedDate to null when "No Date" is selected
    onChange(null);
    console.log("selectedDates:", selectedDate);
  };

  return (
    <div className={`${theme} date-input`} ref={datePickerRef}>
      <div className="date-picker-container"></div>
      <BsFillCalendarDateFill />
      <input
        type="text"
        className={`${theme} datePickerInput`}
        placeholder="Select a date"
        readOnly
        id="selectedDateInput"
        value={
          selectedDate
            ? selectedDate.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
            : "No Date" // Display "No Date" if selectedDate is null
        }
      />
      <Button
        icon={<FaTimes />}
        extraClass={`no-schedule-button ${theme}`}
        onClick={handleCancelClick}
      />
    </div>
  );
};



export default DatePicker;
