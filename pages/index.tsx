import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function MyCalendar() {
  const calendarRef = useRef(null);

  const handleDateSelect = (selectInfo: {
    view: { calendar: any };
    startStr: any;
    endStr: any;
    allDay: any;
  }) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      select={handleDateSelect}
      ref={calendarRef}
      events={[
        { title: "event1", date: "2023-07-01" },
        { title: "event2", date: "2023-07-02" },
      ]}
    />
  );
}

// for generating unique ids
let eventGuid = 0;
function createEventId() {
  return String(eventGuid++);
}
