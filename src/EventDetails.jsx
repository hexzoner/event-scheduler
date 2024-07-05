import { useParams, Link, useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Themes from "./Themes";
import { dateFormat } from "./App";

export default function EventDetails() {
  const [errorPopup, setErrorPopup] = useState({ title: "", message: "" });
  const [editMode, setEditMode] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { authToken, entry, setEntry } = useOutletContext();

  // document.querySelector("html").setAttribute("data-theme", "light");
  const { id } = useParams();
  let navigate = useNavigate();
  const [form, setForm] = useState(null);
  const deleteUrl = `http://localhost:3001/api/events/${id}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getEventUrl = `http://localhost:3001/api/events/${id}`;
    fetch(getEventUrl)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data == null) setNotFound(true);
        else setNotFound(false);
        const _data = data;
        setForm(_data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  function showErrorPopup(title, message) {
    setErrorPopup({ title: title, message: message });
    document.getElementById("errorPopup").show();
  }

  function handleDelete(e) {
    e.preventDefault();
    document.getElementById("deletePopup").show();
  }

  function confirmDelete() {
    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.statusText === "No Content") navigate("/");
        else return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data && data.error) {
          if (data.error === "Record not found") navigate("/");
          else showErrorPopup("Error", data.error);
        } else navigate("/");
      })
      .catch((err) => console.log(err));
  }

  function handleEdit(e) {
    e.preventDefault();
    setEditMode(true);
  }

  function handeSaveEdit(e) {
    // console.log(form.date);
    const body = {
      title: form.title,
      description: form.description,
      date: form.date,
      location: form.location,
      latitude: form.latitude,
      longitude: form.longitude,
      organizerId: form.organizerId,
    };

    if (body.title === "" || body.description === "" || body.location === "") {
      showErrorPopup("Error", "Please enter all the information about the event");
      return;
    }

    // console.log(body);
    // console.log(form);

    fetch(deleteUrl, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) showErrorPopup("Error", data.error);
        else setEditMode(false);
      })
      .catch((err) => alert(err));
  }

  function handleEditing(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function cancelEditMode(e) {
    window.location.reload();
  }

  return (
    <div className="min-h-[100vh]">
      <dialog id="errorPopup" className="modal ">
        <div className="modal-box bg-primary text-primary-content">
          <h3 className="font-bold text-xl">{errorPopup.title}</h3>
          <p className="py-4 text-lg">{errorPopup.message}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="deletePopup" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-primary">
          <h3 className="font-bold text-lg text-primary-content text-center">Are you sure you want to delete this event?</h3>

          <div className="modal-action">
            <div className="flex items-center justify-evenly w-full">
              <button onClick={confirmDelete} className="btn btn-error text-lg">
                Confirm
              </button>
              <form method="dialog">
                <button className="btn text-lg px-6">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      <div className="text-2xl py-4 my-10 bg-base-300 max-w-[800px] m-auto px-4 rounded-lg">
        {notFound ? (
          <>
            <div className="text-3xl text-center my-24 h-72 flex flex-col justify-around">
              <p>Event not found</p>
              <Link to="/" className="text-left m-auto ">
                <button className="btn btn-neutral   mt-3 px-8 text-lg w-fit m-auto ">Return to the Home page</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            {form ? (
              <>
                <div className="flex justify-between">
                  <p className="pl-2 w-full text-center text-2xl font-bold">Event information</p>
                  {/* <Themes /> */}
                </div>
                <div className="text-lg flex flex-col gap-3 mb-2 mt-4 text-center">
                  {editMode ? (
                    <>
                      <input
                        onChange={handleEditing}
                        onClick={(e) => e.currentTarget.showPicker()}
                        type="datetime-local"
                        name="date"
                        id="date"
                        className="bg-base-100 py-4 rounded-lg text-center px-8 w-fit m-auto  input input-bordered input-lg"
                        // defaultValue={form.date ? new Date().toISOString().slice(0, 16) : ""}
                        defaultValue={form.date ? new Date(form.date).toISOString().slice(0, 16) : ""}
                      />
                      <input
                        onChange={handleEditing}
                        type="text"
                        name="title"
                        id="title"
                        className="bg-base-100 py-4 rounded-lg px-4 text-center input input-bordered input-lg"
                        placeholder="The title..."
                        value={form.title}
                      />

                      <input
                        onChange={handleEditing}
                        type="text"
                        name="location"
                        className="bg-base-100 py-4 rounded-lg px-4 text-center  input input-bordered input-lg"
                        placeholder="Enter the location..."
                        value={form.location}
                      />
                      <textarea
                        onChange={handleEditing}
                        name="description"
                        id="description"
                        className="resize-none bg-base-100 py-4 rounded-lg min-h-[150px] px-4 text-center  input input-bordered input-lg"
                        placeholder="Enter the description..."
                        value={form.description}></textarea>
                    </>
                  ) : (
                    <>
                      <p className="bg-base-100 py-4 rounded-lg w-fit m-auto px-16">{dateFormat(form.date)}</p>
                      <p className="bg-base-100 py-4 rounded-lg">{form.title}</p>
                      <p className="bg-base-100 py-4 rounded-lg">{form.location}</p>
                      <p className="bg-base-100 py-4 rounded-lg min-h-[150px] px-4">{form.description}</p>
                    </>
                  )}

                  <div className="flex justify-between">
                    <Link to="/" className="text-left">
                      <button className="btn btn-neutral  w-fit m-auto mt-3 px-8 text-lg">Return</button>
                    </Link>
                    <div className="flex gap-3">
                      {authToken && (
                        <>
                          {editMode ? (
                            <button onClick={cancelEditMode} className="btn btn-neutral  w-fit m-auto mt-3 px-6 text-lg">
                              Cancel
                            </button>
                          ) : (
                            <button onClick={handleDelete} className="btn btn-error  w-fit m-auto mt-3 px-6 text-lg">
                              Delete
                            </button>
                          )}

                          {editMode ? (
                            <button onClick={handeSaveEdit} className="btn btn-success  w-fit m-auto mt-3 px-8 text-lg">
                              Save
                            </button>
                          ) : (
                            <button onClick={handleEdit} className="btn btn-primary  w-fit m-auto mt-3 px-8 text-lg">
                              Edit
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="skeleton h-[450px]"></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
