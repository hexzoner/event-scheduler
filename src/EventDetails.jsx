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
    // console.log(id);
    const today = Date().toString().split(" ");
    setForm({ ...form, ["date"]: `${today[2]}  ${today[1]}  ${today[3]}` });
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
