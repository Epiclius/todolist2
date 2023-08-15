import { useState } from "react";
import NavMenu from "./components/NavMenu";

import "./App.css";

function App() {
  return (
    <>
      <div className="divide">
        <NavMenu />

        <div className="container">
          <div className="sidebarMenu">
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

          <div className="golden-container">
            <div className="content">
              <p>
                <span>React</span> + <span>Vite</span> + <span>Tailwind</span> +{" "}
                <span>TypeScript</span>
              </p>
              <p>
                <span>React</span> + <span>Vite</span> + <span>Tailwind</span> +{" "}
                <span>TypeScript</span>
              </p>
              <p>
                <span>React</span> + <span>Vite</span> + <span>Tailwind</span> +{" "}
                <span>TypeScript</span>
              </p>
              <p>
                <span>React</span> + <span>Vite</span> + <span>Tailwind</span> +{" "}
                <span>TypeScript</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
