import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/common";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";

export default function MyCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [eventGuid, setEventGuid] = useState(0);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
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

  const handleEventClick = (clickInfo: EventClickArg) => {
    clickInfo.event.remove();
  };

  const updateEventListInUrl = () => {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current.getApi();
    const eventList = calendarApi.getEvents().map((event) => {
      return {
        id: event.id,
        start: event.start!.toISOString(),
        end: event.end!.toISOString(),
        allDay: event.allDay,
      };
    });
    const url = new URL(window.location.href);
    url.searchParams.set("events", JSON.stringify(eventList));
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const eventsInUrl = url.searchParams.get("events");
    if (eventsInUrl) {
      const events = JSON.parse(eventsInUrl);
      if (!calendarRef.current) return;
      const calendarApi = calendarRef.current.getApi();
      events.forEach((event: any) => {
        calendarApi.addEvent(event);
      });
      setEventGuid(events.length);
    }
  }, []);

  const createEventId = () => {
    const newGuid = eventGuid + 1;
    setEventGuid(newGuid);
    return String(newGuid);
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      selectable={true}
      select={handleDateSelect as any}
      eventClick={handleEventClick as any}
      eventsSet={updateEventListInUrl}
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
