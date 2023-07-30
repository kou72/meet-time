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
    // clear date selection
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    // Add event to calendar without prompt
    calendarApi.addEvent({
      id: createEventId(),
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
