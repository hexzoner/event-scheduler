import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const loginUrl = "http://localhost:3001/api/auth/login";
import { authenticate } from "./App";

export default function Login() {
  const [usernameEmail, setUsernameEmail] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLogin = {
      email: usernameEmail,
      password: passwordLogin,
    };

    console.log(JSON.stringify(newLogin));
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLogin),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        authenticate(data.token);
        navigate("/");
      })
      .catch((err) => console.log(err));
    // console.log(newLogin);
    //onSave(newLogin);
  };

  return (
    <div className=" inset-0 bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 bg-opacity-50 flex items-center justify-center h-screen">
      <div className=" mask mask-parallelogram-3  shadow-lg">
        <div className="  bg-white p-32 m-6  shadow-lg w-full  max-w-md">
          <h2 className="text-xl font-bold mb-8 text-center">Sign In</h2>

          <label className="block mb-2">Email:</label>
          <input value={usernameEmail} onChange={(e) => setUsernameEmail(e.target.value)} type="email" className="w-full p-2 border border-sky-500 rounded" required placeholder="email@example.com" />
          <label className="block my-2">Password:</label>
          <input value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} type="password" className="w-full p-2 border border-sky-500 rounded" required placeholder="Password" />

          <div className="mt-6">
            <button onClick={routeChange} className="px-4 py-2 bg-sky-500 text-white rounded mr-2 hover:bg-sky-700">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-700">
              Sign in!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
