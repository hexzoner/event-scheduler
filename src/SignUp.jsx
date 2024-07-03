import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
const signUpUrl = "http://localhost:3001/api/users";
const loginUrl = "http://localhost:3001/api/auth/login";
const loginStorageKey = "event-schedule-token";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setAuthToken, setUserID } = useOutletContext();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: username,
      password: password,
      email: email,
    };
    // console.log(newUser);
    fetch(signUpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) alert(data.error);
        else if (data.isActive) {
          fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
          })
            .then((res) => res.json())
            .then((data) => {
              setAuthToken(data.token);
              localStorage.setItem(loginStorageKey, JSON.stringify({ token: data.token, userID: data.user.id }));
              setUserID(data.user.id);
              navigate("/");
            });
        }
        // navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" inset-0 bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 bg-opacity-50 flex items-center justify-center h-screen">
      <div className=" mask mask-parallelogram-3  shadow-lg">
        <div className="  bg-white p-32 m-6  shadow-lg w-full  max-w-md">
          <h2 className="text-xl font-bold mb-8 text-center">Sign Up</h2>

          <label className="block mb-2">Full Name:</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="w-full p-2 border border-sky-500 rounded" required placeholder="John Doe" />
          <label className="block my-2">Password:</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 border border-sky-500 rounded" required placeholder="Password" />
          <label className="block my-2">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-sky-500 rounded" required placeholder="email@example.com" />
          <div className="mt-6">
            <button onClick={routeChange} className="px-4 py-2 bg-sky-500 text-white rounded mr-2 hover:bg-sky-700">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-700">
              Sign up!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
