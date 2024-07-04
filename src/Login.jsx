import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
const loginUrl = "http://localhost:3001/api/auth/login";
const loginStorageKey = "event-schedule-token";

export default function Login() {
  const [usernameEmail, setUsernameEmail] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const { setAuthToken, setUserID } = useOutletContext();

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

    // console.log(JSON.stringify(newLogin));
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLogin),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error);
        else {
          console.log(data);
          setAuthToken(data.token);
          localStorage.setItem(loginStorageKey, JSON.stringify({ token: data.token, userID: data.user.id }));
          setUserID(data.user.id);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" inset-0 bg-gradient-to-tr from-base-200 via-primary to-base-200 flex items-center justify-center h-screen">
      <div className=" mask mask-parallelogram-3  shadow-lg">
        <div className="  bg-base-300  p-32 m-6  shadow-lg w-full  max-w-md">
          <h2 className="text-xl font-bold mb-8 text-center">Sign In</h2>

          <label className="block mb-2">Email:</label>
          <input value={usernameEmail} onChange={(e) => setUsernameEmail(e.target.value)} type="email" className="w-full p-2 border border-primary rounded" required placeholder="email@example.com" />
          <label className="block my-2">Password:</label>
          <input value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} type="password" className="w-full p-2 border border-primary rounded" required placeholder="Password" />

          <div className="mt-6">
            <button onClick={routeChange} className="px-4 py-2 bg-primary text-primary-content mr-2 hover:bg-sky-700">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-primary-content hover:bg-sky-700">
              Sign in!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
