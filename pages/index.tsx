import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // Use timeGrid plugin instead of dayGrid
import interactionPlugin from "@fullcalendar/interaction";

export default function MyCalendar() {
  const calendarRef = useRef(null);

  const handleDateSelect = (selectInfo: {
    view: { calendar: any };
    startStr: any;
    endStr: any;
    allDay: any;
  }) => {
    // Generate a title based on start and end times
    let title = "";
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    // Add event to calendar without prompt
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]} // Use timeGridPlugin here
      initialView="timeGridWeek" // Change to 'timeGridWeek' for week view
      selectable={true}
      select={handleDateSelect}
      ref={calendarRef}
      events={[]}
    />
  );
}

// for generating unique ids
let eventGuid = 0;
function createEventId() {
  return String(eventGuid++);
}
