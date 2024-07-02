import { NavLink } from "react-router-dom";

export default function NavBar() {
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
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign up</NavLink>
        </li>
      </ul>
    </div>
  );
}
