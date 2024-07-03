import { useEffect, useState } from "react";
import axios from "axios";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  // const [hasNext, setHasNext] = useState(true);
  // const [hasPrev, setHasPrev] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/events`)
      .then((res) => {
        // setHasNext(res.data.hasNextPage);
        // setHasPrev(res.data.hasPreviousPage);
        setEvents(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  return (
    <>
      {/* {events.map((event) => {
        return (
          <p key={event.id} className="text-xl font-bold bg-slate-600">
            {event.title}
          </p>
        );
      })}
      <button
        disabled={!hasPrev}
        onClick={(e) => {
          setPage(page - 1);
        }}
      >
        Prev Page
      </button>
      <button
        disabled={!hasNext}
        onClick={(e) => {
          setPage(page + 1);
        }}
      >
        Next Page
      </button> */}

      <div className="container m-auto py-8">
        <p className="text-center text-xl font-bold">Home Page Component</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 shadow-sm">
          {/* -Map with App info test- */}
          {events.map((event) => {
            const eventYear = event.date.slice(0, 4);
            const eventDay = event.date.slice(8, 10);
            const eventMonth = event.date.slice(5, 7);
            const monthName = monthNames[eventMonth - 1];
            console.log(event.date);

            return (
              <div className="flex row items-start" key={event.id}>
                <ul className="text-center p-4 border min-w-48 h-full">
                  <li className="text-5xl font-bold">{eventDay}</li>
                  <li className="text-xl font-bold text-sky-500">
                    {monthName}
                  </li>

                  <li className="text-lg font-semibold text-slate-500 border-t pt-2 mt-2">
                    {event.date.slice(11, 16)}
                  </li>
                </ul>
                <div className="bg-slate-100 p-4  w-full h-full relative">
                  <p className="text-xl font-bold line-clamp-2">
                    {event.title}
                  </p>
                  <p className="text-md text-slate-500 line-clamp-2">
                    {event.description}
                  </p>
                  <p className="flex align-middle text-md font-semibold my-4">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        className="bi bi-geo-alt mr-2 mt-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      </svg>
                    </span>
                    {event.location}
                  </p>
                  <div className="absolute bottom-0 right-0 px-4 py-1 bg-sky-950 text-white text-sm">
                    {eventYear}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
