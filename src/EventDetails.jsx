import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EventDetails() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "Event title example",
    description: "Event description example",
    date: "Empty",
    location: "Germany",
    latitude: 30,
    longitude: 50,
    organizerId: 99,
  });

  useEffect(() => {
    const getEventUrl = `http://localhost:3001/api/events/${id}`;
    fetch(getEventUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const _data = data;
        const yy = data.date.toString().slice(0, 4);
        const mm = data.date.toString().slice(5, 7);
        const dd = data.date.toString().slice(8, 10);
        const time = data.date.toString().slice(11, 16);
        _data.date = `${dd}.${mm}.${yy} - ${time}`;
        setForm(_data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="text-center text-3xl py-8 my-4 bg-base-300 max-w-[700px] m-auto px-6">
      Details of the Event {id}{" "}
      <div className="text-xl flex flex-col gap-2 my-4">
        <p className="bg-base-100 ">{form.title}</p>
        <p className="bg-base-100 ">{form.date}</p>
        <p className="bg-base-100 ">{form.location}</p>
        <p className="bg-base-100 ">{form.description}</p>
      </div>
    </div>
  );
}
