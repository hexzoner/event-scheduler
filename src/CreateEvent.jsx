import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Themes from "./Themes";

const postEventAPI = "http://localhost:3001/api/events";

export default function CreateEvent({ event }) {
  const [form, setForm] = useState({ title: "", description: "", date: new Date(), location: "", latitude: 0, longitude: 0, organizerId: 0 });

  // console.log(event);
  if (event) {
    setForm(event);
    event = null;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <div className="bg-base-300 max-w-[600px] m-auto my-6 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-2xl pt-4 ml-6">Create New Event</p>
        <div className="pt-4 pr-3">
          <Themes />
        </div>
      </div>
      <form onSubmit={handleSubmit} action="submit">
        <div className="flex flex-col gap-3 mx-4 my-2 py-4">
          <input onChange={handleChange} className="input input-bordered input-lg w-full" type="text" name="title" id="title" placeholder="Event Title..." value={form.title} />
          <input onChange={handleChange} className="input input-bordered input-lg w-fit" type="datetime-local" name="date" id="date" value={form.date} />
          <input
            onChange={handleChange}
            className="input input-bordered input-lg w-full " //"input-error"
            type="text"
            name="location"
            id="location"
            placeholder="Event location..."
            value={form.location}
          />
          <textarea
            onChange={handleChange}
            className="textarea textarea-bordered textarea-lg w-full resize-none h-[150px]" //"textarea-error"
            name="description"
            id="description"
            placeholder="Event description..."
            value={form.description}></textarea>
          <div className="flex w-full justify-between">
            <button className="btn btn-neutral  px-6 text-lg" type="submit">
              Create Event
            </button>

            <Link to="/">
              <button className="btn btn-neutral px-6 text-lg">Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
