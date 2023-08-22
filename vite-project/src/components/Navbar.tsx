import React from "react";
import Button from "./Button";


// https://react-icons.github.io/react-icons/
import { AiFillHome, AiOutlineMenu, AiFillDislike } from "react-icons/Ai";

interface NavBarProps {
  functions: {
    [key: string]: () => void;
  },
}

function NavBar({ functions }: NavBarProps) {
  return (
    <div className="navbar">
      <Button
        icon={<AiOutlineMenu />}
        onClick={functions.toggleSidebar}
      ></Button>
      <Button icon={<AiFillHome />}></Button>
      <input type="text" placeholder="Search" />
      <Button icon={<AiFillDislike />} onClick={functions.toggleTheme}></Button>
    </div>
  );
}

export default NavBar;
