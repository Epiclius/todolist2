import React from "react";
import Button from "./Button";

import {
  AiFillHome,
  AiOutlineMenu,
} from "react-icons/Ai";

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
    </div>
  );
}

export default NavBar;
