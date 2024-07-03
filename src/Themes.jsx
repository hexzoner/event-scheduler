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

  const themesSwap = ["light", "night"];

  const [theme, setTheme] = React.useState(JSON.parse(localStorage.getItem(storageKey)) || themesSwap[0]);

  function handleChange(e) {
    setTheme(e.target.value);
    applyTheme(e.target.value);
  }

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  window.onload = () => {
    loadThemeFromStorage();
  };

  function loadThemeFromStorage() {
    applyTheme(JSON.parse(localStorage.getItem(storageKey)) || themesSwap[0]);
    // const _theme = JSON.parse(localStorage.getItem(storageKey)) || "nord";
    // setTheme(_theme);
    // document.querySelector("html").setAttribute("data-theme", _theme);
  }

  function applyTheme(theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem(storageKey, JSON.stringify(theme));
    setTheme(theme);
  }

  function handleSwap(e) {
    e.target.checked = !e.target.checked;
    console.log(e.target.checked);
    console.log(theme);
    e.target.checked ? applyTheme(themesSwap[1]) : applyTheme(themesSwap[0]);
  }

  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input onChange={handleSwap} type="checkbox" checked={theme === themesSwap[0] ? true : false} />

      {/* sun icon */}
      <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>

      {/* moon icon */}
      <svg className="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
    // <div className="dropdown mb-2">
    //   <div className="flex items-center">
    //     <div className="hidden">Theme: </div>
    //     <div tabIndex={0} role="button" className="btn m-1 w-44">
    //       {capitalize(theme)}
    //       <svg width="12px" height="12px" className="inline-block h-2 w-2 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
    //         <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
    //       </svg>
    //     </div>
    //   </div>
    //   <ul tabIndex={0} className="overflow-y-auto max-h-[400px] ml-2 dropdown-content bg-base-300 rounded-box z-[1] w-44 p-0 shadow-2xl">
    //     {themes.map((theme) => {
    //       return (
    //         <li key={theme}>
    //           <input onClick={handleChange} type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label={capitalize(theme)} value={theme} />
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
  );
}
