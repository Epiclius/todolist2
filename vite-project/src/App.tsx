import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/Button";

import {
  AiOutlinePlus,
  AiFillHome,
  AiOutlineMenu,
  AiFillStar,
} from "react-icons/Ai";

function App() {
  return (
    <>
      <div className="navbar">
        <div>
          <Button icon={<AiOutlineMenu />}></Button>
          <Button icon={<AiFillHome />}></Button>
          <input type="text" placeholder="Search" />
        </div>

        <div>
          <Button
            icon={<AiFillStar />}
            text={<span> Upgrade to Pro </span>}
            extraClass="with-text"
          ></Button>
          <Button icon={<AiOutlinePlus />}></Button>
          <Button
            icon={<img src="src/assets/profile_picture.png" alt="Icon" className="profile_picture"/>}
          ></Button>
        </div>
      </div>

      <div className="container">
        <div className="sidebarMenu"> 

        </div>
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
    </>
  );
}

export default App;
