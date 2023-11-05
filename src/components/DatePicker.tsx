import { useContext, useEffect, useRef, useState } from "react";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { ThemeContext } from "./ThemeProvider";
import Button from "./Button";
import { FaTimes } from "react-icons/Fa";
import { AiFillCalendar } from "react-icons/Ai";
import { BiSolidTime } from "react-icons/Bi";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ToolTip";

interface Props {
  scheduleDateTime: Date | null;
  onScheduleChange: (newDate: Date | null) => void;
}

const DatePicker = ({ scheduleDateTime, onScheduleChange }: Props) => {
  const { theme } = useContext(ThemeContext);
  const datePickerContainerRef = useRef<HTMLDivElement>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDateString, setSelectedDateString] =
    useState<string>("No Date");
  const [time, setTime] = useState<string>(
    scheduleDateTime === null
      ? "11:59 PM"
      : new Date(scheduleDateTime).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    scheduleDateTime === null ? null : new Date(scheduleDateTime)
  );

  let datePickr: flatpickr.Instance;

  const toggleDatePicker = () => {
    console.log("current selected schedule date: ", selectedDate);
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setTime("11:59 PM");
    setShowTimePicker(!showTimePicker);
  };

  const handleNoDateClick = () => {
    setSelectedDate(null);
    setTime("11:59 PM");
    onScheduleChange(null);
    setShowTimePicker(false);
  };
  
  const handleNoTimeClick = () => {
    let defaultTime = new Date(selectedDate as Date);
    defaultTime.setHours(23);
    defaultTime.setMinutes(59);
    
    console.log("defaultTime: ", defaultTime);
    setSelectedDate(defaultTime);

    onScheduleChange(defaultTime);

    toggleTimePicker();
  };

  useEffect(() => {
    if (datePickerContainerRef.current) {
      const dateOptions = {
        clickOpens: true,
        dateFormat: "M j, Y",
        enableTime: false,
        position: "auto center",
        monthSelectorType: "static",
        minDate: "today",
        defaultDate: selectedDate ? selectedDate : "",
        positionElement: datePickerContainerRef.current,
        onClose: function (selectedDates: Date[]) {
          setSelectedDate(
            selectedDates[0]
              ? new Date(
                  moment(selectedDates[0]).format("YYYY-MM-DD") + " " + time
                )
              : null
          );
          onScheduleChange(
            selectedDates[0]
              ? new Date(
                  moment(selectedDates[0]).format("YYYY-MM-DD") + " " + time
                )
              : null
          );
        },
        onChange: function () {
          datePickr.open();
        },
      };

      datePickr = flatpickr(datePickerContainerRef.current, dateOptions);
    }

    // careful 
    if (showDatePicker && datePickr) {
      datePickr.open();
    }

    if (!showTimePicker) {
    } else {

    }

    if (time === "11:59 PM") {
      setShowTimePicker(false);
    } else {
      setShowTimePicker(true);
    }

    return () => {
      if (datePickr) {
        datePickr.destroy();
      }
    };
  }, [showDatePicker]);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDateString("No Date");
    } else {
      const time = selectedDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const date = selectedDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const currentDate = new Date();
      const tomorrowDate = new Date(currentDate);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);

      const currentDateFormat = currentDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const tomorrowDateFormat = tomorrowDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      if (date.includes(currentDateFormat)) {
        if (time === "11:59 PM") {
          setSelectedDateString("Today");
        } else {
          setSelectedDateString(`Today`);
        }
      } else if (date.includes(tomorrowDateFormat)) {
        setSelectedDateString(`Tomorrow`);
      } else {
        setSelectedDateString(`${date}`);
      }
    }
  }, [selectedDate]);

  return (
    <Tooltip>
      <div ref={datePickerContainerRef} className="date-picker-container">
        <TooltipTrigger>
          <Button
            icon={<AiFillCalendar />}
            onClick={toggleDatePicker}
            extraClass={`date-picker-button ${theme}`}
          />
        </TooltipTrigger>
        <TooltipContent className={`Tooltip ${theme} schedule-tooltip`}>
          <span>scheduled -</span> {selectedDateString}
          {time === "11:59 PM" ? "" : ` `}
          {time === "11:59 PM" ? "" : <span>@</span>}
          {time === "11:59 PM" ? "" : time}
        </TooltipContent>

        {showDatePicker && (
          <>
            <div
              className="modal-overlay"
              onClick={() => {
                setShowDatePicker(false);
              }}
            />
            <div className={`date-picker-modal ${theme}`}>
              <input
                type="text"
                className={`${theme} datePickerInput`}
                readOnly
                id="selectedDateInput"
                value={
                  selectedDate
                    ? selectedDate.toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No Date"
                }
              />
              {selectedDate && (
                <>
                  <Button
                    icon={<FaTimes />}
                    extraClass={`no-schedule-button ${theme}`}
                    onClick={handleNoDateClick}
                  />
                  <span className="picker-divider">|</span>
                  {showTimePicker ? (
                    <>
                      <div className="App">
                        <TimePicker
                          placeholder={time ? time : "11:59 PM"}
                          use12Hours
                          showSecond={false}
                          focusOnOpen={true}
                          format="hh:mm A"
                          onChange={(e) => {
                            setTime(e.format("LT"));
                          }}
                          onClose={() => {
                            setSelectedDate(
                              new Date(
                                moment(selectedDate).format("YYYY-MM-DD") +
                                " " +
                                time
                                )
                              );
                                
                            // onScheduleChange with new time
                            onScheduleChange(
                              new Date(
                                moment(selectedDate).format("YYYY-MM-DD") +
                                " " +
                                time
                                )
                              );
                            
                            console.log(
                              "selectedDate inside TimePicker:",
                              selectedDate
                            );
                          }}
                        />
                      </div>
                      <Button
                        icon={<FaTimes />}
                        extraClass={`no-schedule-button ${theme}`}
                        onClick={handleNoTimeClick}
                      />
                    </>
                  ) : (
                    <Button icon={<BiSolidTime />} onClick={toggleTimePicker} />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Tooltip>
  );
};

export default DatePicker;
