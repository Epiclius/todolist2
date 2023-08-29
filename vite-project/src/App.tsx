import React, { useEffect, useReducer, useState, useContext } from "react";

import { debounce } from "lodash";
import { ThemeContext } from "./components/ThemeContext";
import "./App.css";
import NavBar from "./components/Navbar";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import TodayPage from "./components/TodayPage";
import UpcomingPage from "./components/UpcomingPage";


export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
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

      <BrowserRouter>
        <div
          id="sidebarMenu"
          className={`${theme} ${currentContainersState.sidebarMenu}`}
        >
          <Link to="/">
            <span>Today</span>
          </Link>
          <Link to="/Upcoming">
            <span>Upcoming</span>
          </Link>

          <span className="projects"> some text </span>
        </div>

        <div
          id="container"
          className={`${theme} ${currentContainersState.mainContainer}`}
        >
          <Routes>
            <Route path="/" element={<TodayPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
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
  const { type, payload } = toggleContainersState;

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
