import { NavLink } from "react-router-dom";
const loginStorageKey = "event-schedule-token";

export default function NavBar({ authToken, setAuthToken, setUserID }) {
  return (
    <div className="text-center">
      <ul className="flex justify-evenly m-auto py-2">
        <li className="">
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/create-event">Create Event</NavLink>
        </li>
        <li>
          <NavLink to="/event/2">View Event 2</NavLink>
        </li>
        {authToken.length === 0 ? (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "font-bold text-lg  scale-105 duration-300" : "scale-100 duration-300")}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? "font-bold text-lg  scale-105 duration-300" : "scale-100 duration-300")}>
                Sign Up
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <button
              onClick={(e) => {
                setAuthToken("");
                setUserID(-1);
                localStorage.setItem(loginStorageKey, JSON.stringify({ token: "", userID: -1 }));
              }}>
              Logout
            </button>
            <li>{/* <NavLink to="/">Logout</NavLink> */}</li>
          </>
        )}
      </ul>
    </div>
  );
}
