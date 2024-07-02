import React, { useEffect } from "react";
// import { capitalize } from "./App";
const storageKey = "event-scheduler-theme";

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

export default function Themes() {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];
  const [theme, setTheme] = React.useState(JSON.parse(localStorage.getItem(storageKey)) || "light");

  function handleChange(e) {
    setTheme(e.target.value);
    document.querySelector("html").setAttribute("data-theme", e.target.value);
    localStorage.setItem(storageKey, JSON.stringify(e.target.value));
  }

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  window.onload = () => {
    loadThemeFromStorage();
  };

  function loadThemeFromStorage() {
    const _theme = JSON.parse(localStorage.getItem(storageKey)) || "light";
    setTheme(_theme);
    document.querySelector("html").setAttribute("data-theme", _theme);
  }

  return (
    <div className="dropdown mb-2">
      <div className="flex items-center">
        <div className="hidden">Theme: </div>
        <div tabIndex={0} role="button" className="btn m-1 w-44">
          {capitalize(theme)}
          <svg width="12px" height="12px" className="inline-block h-2 w-2 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
      </div>
      <ul tabIndex={0} className="overflow-y-auto max-h-[400px] ml-2 dropdown-content bg-base-300 rounded-box z-[1] w-44 p-0 shadow-2xl">
        {themes.map((theme) => {
          return (
            <li key={theme}>
              <input onClick={handleChange} type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label={capitalize(theme)} value={theme} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
