import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Modal from "@/components/Modal";

const PlanningPage = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const getEventColor = (tipo) => {
    switch (tipo) {
      case "desayuno":
        return "orange";
      case "almuerzo":
        return "green";
      case "cena":
        return "purple";
      default:
        return "gray";
    }
  };

  const [events, setEvents] = useState([
    {
      id: "66a7f9eb73da6ee732c1ce2e",
      tipo: "desayuno",
      title: "Desayuno",
      start: "2024-07-12",
    },
    {
      id: "66a8245773da6ee732c1ceee",
      tipo: "almuerzo",
      title: "Almuerzo",
      start: "2024-07-01",
    },
  ]);
  const handleSelect = (arg) => {
    setOpen(true);
    const { tipo } = arg.event._def.extendedProps;
    const id = arg.event._def.publicId;
    setId(id);
    console.log(id, arg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="w-[720px] m-4">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events.map((event) => {
            return {
              ...event,
              color: getEventColor(event.tipo),
            };
          })}
          eventClick={handleSelect}
          locale={{
            code: "es",
            firstDay: 1,
            buttonText: {
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
            },
          }}
        />
      </div>
      <Modal isOpen={open} onClose={handleClose} id={id} />
    </div>
  );
};
export default PlanningPage;
