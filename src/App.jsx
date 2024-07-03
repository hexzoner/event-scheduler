import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { createBrowserRouter, createRoutesFromElements, Link, Navigate, Outlet, Route, RouterProvider } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import CreateEvent from "./CreateEvent";
import EventDetails from "./EventDetails";
import NavBar from "./Navbar";
import Footer from "./Footer";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
const loginStorageKey = "event-schedule-token";

export function dateFormat(date) {
  const yy = date.toString().slice(0, 4);
  const mm = date.toString().slice(5, 7);
  const dd = date.toString().slice(8, 10);
  const time = date.toString().slice(11, 16);
  return `${dd}.${mm}.${yy} - ${time}`;
}

function App() {
  const [userID, setUserID] = useState(-1);
  const [authToken, setAuthToken] = useState("");
  const [entry, setEntry] = useState({ title: "", description: "", date: new Date(), location: "", latitude: 0, longitude: 0, organizerId: userID });

  useEffect(() => {
    const userAuthData = JSON.parse(localStorage.getItem(loginStorageKey)) || "";
    // console.log(userAuthData);
    if (userAuthData) {
      setUserID(userAuthData.userID);
      setAuthToken(userAuthData.token);
      // console.log(authToken.length);
    }
  }, []);

  const MainLayout = () => {
    return (
      <>
        <NavBar setAuthToken={setAuthToken} authToken={authToken} setUserID={setUserID} />
        <div>
          <Outlet context={{ authToken, setAuthToken, userID, setUserID, entry, setEntry }} />
        </div>
        <Footer />
      </>
    );
  };

  const ProtectedLayout = () => {
    const userAuthData = JSON.parse(localStorage.getItem(loginStorageKey)) || "";
    return userAuthData && userAuthData.token.length > 0 ? <Outlet context={{ authToken, setAuthToken, userID, setUserID, entry, setEntry }} /> : <Navigate to="/login" />;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        <Route path="create-event" element={<ProtectedLayout />}>
          <Route index element={<CreateEvent />} />
        </Route>

        <Route path="event/:id" element={<EventDetails />}></Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
