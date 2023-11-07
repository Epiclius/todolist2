export const formatDateToString = (schedule: Date | null) => {
  let scheduleString = "No Date";
  
  if (!schedule) {
    console.log("newSchedule fjalskdjfkl");
    return "No Date";
  } else {
    const date = schedule.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    console.log("date: ", date)

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
      return `Today`;
    } else if (date.includes(tomorrowDateFormat)) {
      return `Tomorrow`;
    } else {
      return `${date}`;
    }
  }
};