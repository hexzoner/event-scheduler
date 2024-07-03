import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
const postEventAPI = "http://localhost:3001/api/events";
import Themes from "./Themes";

export default function CreateEvent() {
  const { userID, authToken, entry, setEntry } = useOutletContext();
  const [form, setForm] = useState({ title: "", description: "", date: new Date(), location: "", latitude: 0, longitude: 0, organizerId: userID });
  // console.log(userID);
  let navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    fetch(postEventAPI, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // console.log("SUCCESS");
        if (!data.error) navigate("/");
        else alert(data.error);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-[100vh]">
      <div className="bg-base-300 max-w-[800px] m-auto my-10 rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-2xl pt-4 ml-6">Add New Event</p>
          <div className="text-2xl pt-4 ml-6 mr-4">
            <Themes />
          </div>
        </div>
        <form onSubmit={handleSubmit} action="submit">
          <div className="flex flex-col gap-2 mx-4 py-4">
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
            <div className="flex w-full justify-between mt-4 mb-2">
              <Link to="/">
                <button className="btn btn-neutral px-6 text-lg">Cancel</button>
              </Link>
              <button className="btn btn-primary  px-6 text-lg" type="submit">
                Create Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
