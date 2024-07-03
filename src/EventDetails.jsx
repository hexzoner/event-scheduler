import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Themes from "./Themes";

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
    <div className="min-h-[100vh]">
      <div className="text-2xl py-4 my-10 bg-base-300 max-w-[800px] m-auto px-4 rounded-lg">
        <div className="flex justify-between">
          <p className="pb-2 pl-2 pt-4">Event details (ID:{id}) </p>
          <Themes />
        </div>
        <div className="text-xl flex flex-col gap-3 mb-2 mt-4 text-center">
          <p className="bg-base-100 py-4 rounded-lg">{form.title}</p>
          <p className="bg-base-100 py-4 rounded-lg">{form.date}</p>
          <p className="bg-base-100 py-4 rounded-lg">{form.location}</p>
          <p className="bg-base-100 py-4 rounded-lg min-h-[150px]">{form.description}</p>
          <Link to="/" className="text-left">
            <button className="btn btn-neutral  w-fit m-auto mt-3 px-8 text-lg">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
