import { useParams, Link, useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Themes from "./Themes";

export default function EventDetails() {
  const { authToken, entry, setEntry } = useOutletContext();
  document.querySelector("html").setAttribute("data-theme", "light");
  const { id } = useParams();
  let navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: 30,
    longitude: 50,
    organizerId: -1,
  });
  const deleteUrl = `http://localhost:3001/api/events/${id}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  function handleDelete(e) {
    e.preventDefault();
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
          else alert(data.error);
        } else navigate("/");
      })
      .catch((err) => console.log(err));
  }

  function handleEdit(e) {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <div className="min-h-[100vh]">
      <div className="text-2xl py-4 my-10 bg-base-300 max-w-[800px] m-auto px-4 rounded-lg">
        {form.title !== "" ? (
          <>
            <div className="flex justify-between">
              <p className="pb-2 pl-2 pt-4">Event details (ID:{id}) </p>
              {/* <Themes /> */}
            </div>
            <div className="text-xl flex flex-col gap-3 mb-2 mt-4 text-center">
              <p className="bg-base-100 py-4 rounded-lg">{form.title}</p>
              <p className="bg-base-100 py-4 rounded-lg">{form.date}</p>
              <p className="bg-base-100 py-4 rounded-lg">{form.location}</p>
              <p className="bg-base-100 py-4 rounded-lg min-h-[150px]">{form.description}</p>
              <div className="flex justify-between">
                <Link to="/" className="text-left">
                  <button className="btn btn-neutral  w-fit m-auto mt-3 px-8 text-lg">Return</button>
                </Link>
                <div className="flex gap-3">
                  {authToken && (
                    <>
                      <Link to="/" className="text-left">
                        <button onClick={handleDelete} className="btn btn-error  w-fit m-auto mt-3 px-6 text-lg">
                          Delete
                        </button>
                      </Link>
                      <Link to="/" className="text-left">
                        <button onClick={handleEdit} className="btn btn-primary  w-fit m-auto mt-3 px-8 text-lg">
                          Edit
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="hidden">{/* <Themes /> */}</div>
            {/* <p className="text-3xl mb-4">Event not found</p> */}
            <div className="skeleton h-[450px]"></div>
            <Link to="/" className="text-left">
              <button className="btn btn-neutral  w-fit m-auto mt-3 px-8 text-lg">Return</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
