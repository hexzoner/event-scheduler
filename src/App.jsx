import { useState } from "react";
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

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <SignUp />
      <Login />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export const isAuthenticated = true;
const ProtectedLayout = () => {
  // const isAuthenticated = Math.random() > 0.5 ? true : false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
