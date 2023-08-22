import React, { useEffect, useReducer, useState } from "react";

import { debounce } from "lodash";
import "./App.css";
import NavBar from "./components/Navbar";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const initialContainersState: containerState = {
    sidebarMenu: "",
    mainContainer: "",
    isAuto: true,
    toBeReset: false,
  };

  const [currentContainersState, toggleContainersState] = useReducer(
    containerReducer,
    initialContainersState
  );
  const [isWindowSmall, setWindowSmall] = useState(false);

  const toggleSidebar = () => {
    if (isWindowSmall) {
      toggleContainersState({ type: TOGGLE.SIDEBAR });
    } else {
      toggleContainersState({ type: TOGGLE.BOTH });
    }

    toggleContainersState({ type: TOGGLE.AUTO });

    if (currentContainersState.toBeReset) {
      toggleContainersState({ type: TOGGLE.TOBERESET, payload: false });
      return;
    }
    toggleContainersState({ type: TOGGLE.TOBERESET, payload: true });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "day" ? "light" : "day"));
  };

  const buttonActions = {
    toggleSidebar: toggleSidebar,
    toggleTheme: toggleTheme,
  };

  const handleResize = debounce(() => {
    console.log("resize");
    const newBrowserWidth = window.innerWidth;
    if (newBrowserWidth <= 768) {
      setWindowSmall(true);
    } else {
      setWindowSmall(false);
    }
  }, 150);
  
  useEffect(() => {
    handleResize();
    
    // automatic toggle sidebar on window resize
    if (currentContainersState.isAuto) {
      toggleContainersState({ type: TOGGLE.BOTH });
    }

    // after manual toggle sidebar, reset auto toggle
    if (currentContainersState.toBeReset) {
      if (!isWindowSmall) {
        toggleContainersState({ type: TOGGLE.MAINCONTAINER });
      }
      toggleContainersState({ type: TOGGLE.AUTO });
      toggleContainersState({ type: TOGGLE.TOBERESET, payload: false });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isWindowSmall]);

  return (
    <>
      <NavBar functions={buttonActions} />

      <div id="sidebarMenu" className={`${theme} ${currentContainersState.sidebarMenu}`}>
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

      <div id="container" className={currentContainersState.mainContainer}>
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

const TOGGLE = {
  SIDEBAR: "toggleSidebar",
  MAINCONTAINER: "toggleMainContainer",
  BOTH: "toggleBoth",
  AUTO: "toggleAuto",
  TOBERESET: "toggleReset",
};

interface containerState {
  sidebarMenu: "hidden" | "";
  mainContainer: "expanded" | "";
  isAuto: boolean;
  toBeReset: boolean | undefined;
}

interface ToggleSidebarAction {
  type: string;
  payload?: boolean;
}

function containerReducer(
  state: containerState,
  toggleContainersState: ToggleSidebarAction
): containerState {
  const {type, payload} = toggleContainersState

  switch (type) {
    case TOGGLE.TOBERESET:
      return {
        ...state,
        toBeReset: payload,
      };
    case TOGGLE.AUTO:
      return {
        ...state,
        isAuto: !state.isAuto,
      };
    case TOGGLE.SIDEBAR:
      return {
        ...state,
        sidebarMenu: state.sidebarMenu === "hidden" ? "" : "hidden",
      };
    case TOGGLE.MAINCONTAINER:
      return {
        ...state,
        mainContainer: state.mainContainer === "expanded" ? "" : "expanded",
      };
    case TOGGLE.BOTH:
      return {
        ...state,
        sidebarMenu: state.sidebarMenu === "hidden" ? "" : "hidden",
        mainContainer: state.mainContainer === "expanded" ? "" : "expanded",
      };
    default:
      return state;
  }
}
