import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Modal from "@/components/Modal";
import axios from "axios";

const PlanningPage = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [month] = useState(new Date().getMonth() + 1);

  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    getAllEventsService(month);
  }, [month]);

  const getAllEventsService = async (month: number) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/events/${month}`
    );
    setEvents([
      ...events,
      ...response.data.map((event: any) => {
        return {
          id: event.id,
          idReceta: event.recipe.id,
          title: event.recipe.title,
          type: event.type,
          date: event.date,
        };
      }),
    ]);
  };

  const getEventColor = (tipo: any) => {
    switch (tipo) {
      case "Desayuno":
        return "orange";
      case "Almuerzo":
        return "green";
      case "Cena":
        return "purple";
      default:
        return "gray";
    }
  };

  const handleSelect = (arg: any) => {
    setOpen(true);
    const { idReceta } = arg.event._def.extendedProps;
    // const id = arg.event._def.publicId;
    setId(idReceta);
    console.log(idReceta, arg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="m-4">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events.map((event: any) => {
            return {
              ...event,
              color: getEventColor(event.type),
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
