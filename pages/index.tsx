import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/common";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";

export default function MyCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [eventGuid, setEventGuid] = useState(0);
  const [eventsText, setEventsText] = useState<string>("");
  const [eventsInUrl, setEventsInUrl] = useState<string>("");

  const updateEventsText = (calendarApi: any) => {
    const eventList = calendarApi.getEvents();
    let text = "";
    eventList.forEach((event: any) => {
      const eventStart = new Date(event.start!);
      const eventEnd = new Date(event.end!);
      text += formatDate(eventStart) + " ~ " + formatTime(eventEnd) + "\n";
    });
    setEventsText(text);
  };

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
    updateEventsText(calendarApi);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    clickInfo.event.remove();
    let calendarApi = clickInfo.view.calendar;
    updateEventsText(calendarApi);
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
    setEventsInUrl(url.toString());
  };

  const eventsTextToClipboard = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(eventsText);
  };

  const eventsInUrlToClipboard = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(eventsInUrl);
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
    <div className="h-screen">
      <div className="h-12 bg-gray-200 flex items-center justify-center">
        <h1 className="font-bold text-center">Meet Time</h1>
      </div>
      <div className="flex mt-8 mx-12 h-4/5">
        <div className="flex-grow">
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
            height="100%"
          />
        </div>
        <div className="ml-8 w-80">
          <textarea
            className="w-full h-1/3 p-2 border-2 border-gray-400 rounded bg-gray-100"
            value={eventsText}
          ></textarea>
          <button
            onClick={eventsTextToClipboard}
            className="w-full mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400"
          >
            テキストコピー
          </button>
          <textarea
            className="w-full mt-16 h-1/6 p-2 border-2 border-gray-400 rounded bg-gray-100"
            value={eventsInUrl}
          ></textarea>
          <button
            onClick={eventsInUrlToClipboard}
            className="w-full mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400"
          >
            URLコピー
          </button>
        </div>
      </div>
    </div>
  );
}

const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
  return `${month}月${day}日(${weekday}) ${formatTime(date)}`;
};

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
