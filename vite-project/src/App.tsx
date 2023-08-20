import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/Navbar";

function App() {
  const [isSideBarMenuButtonClicked, setSidebarMenuButtonClicked] =
    useState(false);
  const [isClickedOnSmallWindow, setClickedOnSmallWindow] = useState(false);
  const isWindowSmall = window.innerWidth <= 768;

  const sidebarMenuClassName =
    isSideBarMenuButtonClicked || (isWindowSmall && isClickedOnSmallWindow)
      ? "hidden"
      : "";
  const containerClassName =
    (isSideBarMenuButtonClicked && !isWindowSmall) ||
    (!isClickedOnSmallWindow && isWindowSmall)
      ? "expanded"
      : "";

  const handleResize = () => {
    const sidebarMenu = document.getElementById("sidebarMenu");
    const container = document.getElementById("container");
    const newBrowserWidth = window.innerWidth;

    if (!sidebarMenu || !container) {
      console.log("sidebarMenu or container is null");
      return;
    }

    const isWindowSmall = newBrowserWidth < 768;

    if (isSideBarMenuButtonClicked) {
      console.log("isSideBarMenuButtonClicked is true");

      if (
        (isClickedOnSmallWindow && !isWindowSmall) ||
        (!isClickedOnSmallWindow && isWindowSmall)
      ) {
        setSidebarMenuButtonClicked(false);
        console.log(
          "isClickedOnSmallWindow is " +
            (isClickedOnSmallWindow ? "true" : "false")
        );
      }
      return;
    }

    if (!isWindowSmall) {
      sidebarMenu.classList.remove("hidden");
      container.classList.remove("expanded");
      setSidebarMenuButtonClicked(false);
    } else {
      if (
        sidebarMenu.classList.contains("hidden") &&
        container.classList.contains("expanded")
      ) {
        console.log("sidebarMenu is hidden and container is expanded");
        return;
      }

      console.log("sidebarMenu is not hidden and container is not expanded");
      sidebarMenu.classList.add("hidden");
      container.classList.add("expanded");
      setSidebarMenuButtonClicked(false);
    }
  };

  const toggleSidebar = () => {
    const sidebarMenu = document.getElementById("sidebarMenu");
    const container = document.getElementById("container");

    if (!sidebarMenu) {
      console.log("sidebarMenu is null");
      return;
    }

    sidebarMenu.classList.toggle("hidden");

    if (window.innerWidth >= 768) {
      container?.classList.toggle("expanded");
    }

    setSidebarMenuButtonClicked(true);

    const newBrowserWidth = window.innerWidth;
    newBrowserWidth <= 768
      ? setClickedOnSmallWindow(true)
      : setClickedOnSmallWindow(false);
  };

  const buttonActions = {
    toggleSidebar: toggleSidebar,
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClickedOnSmallWindow, isSideBarMenuButtonClicked]);

  return (
    <>
      <NavBar functions={buttonActions} />

      <div id="sidebarMenu">
        {/* <p>sidebar state: {isWindowSmall.toString()}</p> */}

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

      <div id="container">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, a
          quod aliquid voluptates, quia fuga laborum eligendi animi soluta quis
          maxime. Quisquam, officiis similique non deserunt reprehenderit nihil
          harum delectus temporibus quas veniam. Repellat officiis unde facilis
          veniam, quaerat molestias pariatur, ducimus ad, quas ea nihil ipsam
          quos ratione? Nam vitae expedita debitis at suscipit dolorem quasi
          officia numquam voluptates doloribus delectus similique minima facilis
          sint porro vero cumque iure adipisci facere nisi, ea accusamus. Cumque
          beatae porro iste quidem tempora hic quisquam fugiat nisi non impedit
          odit ipsum, ipsam ab itaque. Veniam recusandae fugit repudiandae
          dignissimos nam, dolorum consequuntur.
        </p>
      </div>
    </>
  );
}

export default App;
