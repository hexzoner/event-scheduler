import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
const postEventAPI = "http://localhost:3001/api/events";
// import Themes from "./Themes";

export default function CreateEvent() {
  // document.querySelector("html").setAttribute("data-theme", "light");

  // console.log(errorPopupEl);
  const { userID, authToken, entry, setEntry } = useOutletContext();
  const [form, setForm] = useState({ title: "", description: "", date: new Date().toISOString().slice(0, 16), location: "", latitude: 0, longitude: 0, organizerId: userID });
  const [errorPopup, setErrorPopup] = useState({ title: "", message: "" });
  // console.log(userID);
  let navigate = useNavigate();
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorPopup({ title: "", message: "" });
  }

  function showErrorPopup(title, msg) {
    setErrorPopup({ title: title, message: msg });
    document.getElementById("errorPopup").show();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.title === "" || form.description === "" || form.location === "") {
      showErrorPopup("Error", "Please enter all the information about the event");
      return;
    }

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
        // console.log(data);
        if (!data.error) navigate("/");
        else {
          // alert(data.error);
          setErrorPopup({ title: "Error", message: data.error });
          document.getElementById("errorPopup").show();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen">
      <dialog id="errorPopup" className="modal ">
        <div className="modal-box bg-warning text-warning-content">
          <h3 className="font-bold text-lg">{errorPopup.title}</h3>
          <p className="py-4">{errorPopup.message}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div className="bg-base-300 max-w-[800px] m-auto my-10 rounded-lg">
        <p className="text-2xl pt-4 text-center w-full">Add New Event</p>
        <form onSubmit={handleSubmit} action="submit">
          <div className="flex flex-col gap-3 mx-4 py-4">
            <input onChange={handleChange} className="input input-bordered input-lg w-fit m-auto px-8 text-center" type="datetime-local" name="date" id="date" value={form.date} />
            <input onChange={handleChange} className="input input-bordered input-lg w-full text-center" type="text" name="title" id="title" placeholder="Event Title..." value={form.title} />
            <input
              onChange={handleChange}
              className="input input-bordered input-lg w-full text-center" //"input-error"
              type="text"
              name="location"
              id="location"
              placeholder="Event location..."
              value={form.location}
            />
            <textarea
              onChange={handleChange}
              className="textarea textarea-bordered textarea-lg w-full resize-none h-[150px] text-center" //"textarea-error"
              name="description"
              id="description"
              placeholder="Event description..."
              value={form.description}></textarea>
            <div className="flex w-full justify-between mt-4 mb-2">
              <Link to="/">
                <button className="btn btn-neutral px-6 text-lg">Cancel</button>
              </Link>
              <button className="btn btn-primary  px-4 text-lg" type="submit">
                Create Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
