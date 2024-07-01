import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="text-center">
      <ul>
        <li className="">
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/create-event">Create Event</NavLink>
        </li>
      </ul>
    </div>
  );
}
