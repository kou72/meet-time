import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";

export default function MyCalendar() {
  const calendarRef = useRef(null);
  const handleDateSelect = (selectInfo: {
    view: { calendar: any };
    startStr: any;
    endStr: any;
    allDay: any;
  }) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    const newEvent = {
      id: createEventId(),
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    };
    calendarApi.addEvent(newEvent);
  };

  const handleEventClick = (clickInfo: { event: any }) => {
    clickInfo.event.remove();
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      selectable={true}
      select={handleDateSelect}
      eventClick={handleEventClick}
      ref={calendarRef}
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
      locale={jaLocale}
      allDaySlot={false}
      editable={true}
    />
  );
}

let eventGuid = 0;
function createEventId() {
  return String(eventGuid++);
}
