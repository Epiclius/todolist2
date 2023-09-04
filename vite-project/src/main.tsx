import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { IconContext } from "react-icons";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <IconContext.Provider value={{ className: "react-icons" }}>
    <ThemeProvider dummy="ThemePR O V I D E R">
      <App />
    </ThemeProvider>
  </IconContext.Provider>
  // </React.StrictMode>
);
