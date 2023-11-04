import { useEffect, useReducer, useState, useContext } from "react";

import { debounce } from "lodash";
import { ThemeContext } from "./components/ThemeProvider";
import "./App.css";
import NavBar from "./components/Navbar";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import TodayPage from "./components/TodayPage";
import UpcomingPage from "./components/UpcomingPage";

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [currentContainersState, toggleContainersState] = useReducer(
    containerReducer,
    initialContainersState
  );
  const [isWindowSmall, setWindowSmall] = useState(false);

  const toggleSidebar = () => {
    if (isWindowSmall) {
      toggleContainersState({ type: "TOGGLE_SIDEBAR" });
    } else {
      toggleContainersState({ type: "TOGGLE_BOTH" });
    }

    if (currentContainersState.overlay === "overlay-active") {
      toggleContainersState({ type: "TOGGLE_OVERLAY" });
    }

    toggleContainersState({ type: "TOGGLE_AUTO" });

    if (currentContainersState.toBeReset) {
      toggleContainersState({ type: "TOGGLE_RESET", payload: false });
      return;
    }

    toggleContainersState({ type: "TOGGLE_RESET", payload: true });
  };

  const buttonActions = {
    toggleSidebar: toggleSidebar,
    toggleTheme: toggleTheme,
  };

  const handleResize = debounce(() => {
    const newBrowserWidth = window.innerWidth;
    if (newBrowserWidth <= 768) {
      setWindowSmall(true);
    } else {
      setWindowSmall(false);
    }
  }, 50);

  useEffect(() => {
    if (isWindowSmall) {
      toggleContainersState({ type: "SHOWN_AND_CONTRACTED" });
    } else {
      toggleContainersState({ type: "HIDDEN_AND_EXPANDED" });
    }
  }, []);

  useEffect(() => {
    if (!isWindowSmall) {
      return;
    }
    if (currentContainersState.sidebarMenu === "hidden") {
      return;
    }
    if (currentContainersState.overlay === "overlay-active") {
      return;
    }
 
    toggleContainersState({ type: "TOGGLE_OVERLAY" });

    const handleClick = () => {
      toggleSidebar();
      toggleContainersState({ type: "TOGGLE_OVERLAY" });
    };

    const mainContainer = document.getElementById("container");

    if (mainContainer) {
      mainContainer.addEventListener("click", handleClick);
    }

    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener("click", handleClick);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [currentContainersState.sidebarMenu]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    if (currentContainersState.isAuto) {
      toggleContainersState({ type: "TOGGLE_BOTH" });
    }

    // after manual toggle sidebar, reset auto toggle
    if (currentContainersState.toBeReset) {
      if (!isWindowSmall) {
        toggleContainersState({ type: "TOGGLE_MAIN_CONTAINER" });
      }
      toggleContainersState({ type: "TOGGLE_AUTO" });
      toggleContainersState({ type: "TOGGLE_RESET", payload: false });
    }

    if (currentContainersState.overlay === "overlay-active") {
      toggleContainersState({ type: "TOGGLE_OVERLAY" });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isWindowSmall]);

  return (
    <>
      <NavBar functions={buttonActions} />

      <BrowserRouter>
        <div
          id="sidebarMenu"
          className={`${theme} ${currentContainersState.sidebarMenu}`}
        >
          <Link to="/todolist2/">
            <span>Today</span>
          </Link>
          <Link to="/todolist2/upcoming">
            <span>Upcoming</span>
          </Link>

          <span className="projects"> some text </span>
        </div>

        <div
          id="container"
          className={`${theme} ${currentContainersState.mainContainer} overlay ${currentContainersState.overlay}`}
        >
          <Routes>
            <Route path="/todolist2/" element={<TodayPage />} />
            <Route path="/todolist2/upcoming" element={<UpcomingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

interface containerState {
  sidebarMenu: "hidden" | "shown";
  mainContainer: "expanded" | "contracted";
  overlay: "overlay-deactive" | "overlay-active";
  isAuto: boolean;
  toBeReset: boolean | undefined;
}

const initialContainersState: containerState = {
  sidebarMenu: "shown",
  mainContainer: "contracted",
  overlay: "overlay-deactive",
  isAuto: true,
  toBeReset: false,
};


type Toggle =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "TOGGLE_MAIN_CONTAINER" }
  | { type: "TOGGLE_BOTH" }
  | { type: "TOGGLE_AUTO" }
  | { type: "TOGGLE_RESET"; payload: boolean }
  | { type: "TOGGLE_OVERLAY"}
  | { type: "SHOWN_AND_CONTRACTED" }
  | { type: "HIDDEN_AND_EXPANDED" };

function containerReducer(
  state: containerState,
  toggle: Toggle
): containerState {
  switch (toggle.type) {
    case "TOGGLE_RESET":
      return {
        ...state,
        toBeReset: toggle.payload,
      };
    case "TOGGLE_OVERLAY":
      return {
        ...state,
        overlay: state.overlay === "overlay-deactive" ? "overlay-active" : "overlay-deactive",
      };
    case "TOGGLE_AUTO":
      return {
        ...state,
        isAuto: !state.isAuto,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarMenu: state.sidebarMenu === "hidden" ? "shown" : "hidden",
      };
    case "TOGGLE_MAIN_CONTAINER":
      return {
        ...state,
        mainContainer:
          state.mainContainer === "expanded" ? "contracted" : "expanded",
      };
    case "TOGGLE_BOTH":
      return {
        ...state,
        sidebarMenu: state.sidebarMenu === "hidden" ? "shown" : "hidden",
        mainContainer:
          state.mainContainer === "expanded" ? "contracted" : "expanded",
      };
    case "SHOWN_AND_CONTRACTED":
      return {
        ...state,
        sidebarMenu: "shown",
        mainContainer: "contracted",
      };
    case "HIDDEN_AND_EXPANDED":
      return {
        ...state,
        sidebarMenu: "hidden",
        mainContainer: "expanded",
      };

    default:
      return state;
  }
}
