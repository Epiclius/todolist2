import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/Navbar";


function App() {
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setBrowserWidth(window.innerWidth);

    console.log("handleResize in window: " + window.innerWidth);

    console.log("handleResize: " + browserWidth);
    if (browserWidth <= 768) {
      console.log("toggleSidebar: " + browserWidth);
      const sidebarMenu = document.getElementById("sidebarMenu");

      if (!sidebarMenu) {
        console.error("sidebarMenu is null");
        return;
      }

      if (sidebarMenu.classList.contains("hidden")) {
        sidebarMenu.classList.remove("hidden");
      }
      else {
        sidebarMenu.classList.add("hidden");
      }
    }
    else {
      console.log("not toggleSidebar");
    }
  };

  // make 4 arbitrary function
  const toggleSidebar = () = {};
    
  const buttonActions = {
    "toggleSidebar": toggleSidebar,
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <>
      <NavBar functions={buttonActions} />
      <div id="sidebarMenu">
        <a href="#" className="logo">
          <span className="logo-text">Logo</span>
        </a>
        <a href="#" className="logo">
          <span className="logo-text">Logo</span>
        </a>
        <a href="#" className="logo">
          <span className="logo-text">Logo</span>
        </a>
      </div>

      <div className="container"></div>
    </>
  );
}

export default App;
