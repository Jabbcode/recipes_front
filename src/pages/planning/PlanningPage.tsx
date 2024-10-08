import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { getEventsByFilters } from "@/api/events.service";
import FormEvent from "./components/FormEvent";
import ModalEvent from "./components/ModalEvent";

const PlanningPage = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [date] = useState(new Date().getMonth() + 1);

  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    getAllEventsService(new Date());
  }, [date]);

  const getAllEventsService = async (date: Date) => {
    const response = await getEventsByFilters({ date });
    setEvents([
      ...events,
      ...response.map((event: any) => {
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
    // console.log(idReceta, arg);
  };

  return (
    <div>
      <FormEvent />
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

      <ModalEvent id={id} open={open} setOpen={setOpen} />
    </div>
  );
};
export default PlanningPage;
