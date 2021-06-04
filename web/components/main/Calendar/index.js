import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import style from "./style.scss";
import AppointmentModal from "../AppointmentModal";
import moment from "moment";

export default function Calendar(props) {
  const statusColor = {
    pending: "warning",
    assigned: "info",
    completed: "success",
    canceled: "danger",
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <>
      <FullCalendar
        timeZone={"UTC"}
        plugins={[interactionPlugin, dayGridPlugin]}
        initialView={"dayGridMonth"}
        selectable={true}
        dateClick={(info) => {
          setSelectedAppointment(null);
          setSelectedDate(info.dateStr);
          setOpenModal(true);
        }}
        eventClick={(event) => {
          setSelectedAppointment(event.event.extendedProps);
          setSelectedDate(event.event.extendedProps.date);
          setOpenModal(true);
        }}
        eventDrop={(info) => {
          const { start, end } = info.oldEvent._instance.range;
          console.log(start, end);
        }}
        droppable={true}
        eventAllow={(dropInfo, draggedEvent) => {
          let allow = true;
          for (const event of props.events) {
            if (new Date(dropInfo.startStr) === new Date(event.date)) {
              allow = false;
            }
          }
          return allow;
        }}
        events={props.events.map((item) => {
          return {
            DoB: item.DoB,
            GPId: item.GPId,
            address: item.address,
            contactNumber: item.contactNumber,
            date: moment(item.date).format("YYYY-MM-DD"),
            gardianName: item.gardianName,
            guid: item.guid,
            schollId: item.schollId,
            status: item.status,
            summary: item.summary,
            className: `fc-event-${statusColor[item.status]}`,
          };
        })}
      />
      {openModal && (
        <AppointmentModal
          open={openModal}
          setOpen={setOpenModal}
          date={selectedDate}
          appointment={selectedAppointment}
          hendleAddNewAppointment={props.hendleAddNewAppointment}
        />
      )}
    </>
  );
}
