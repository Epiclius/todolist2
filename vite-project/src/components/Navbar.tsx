import React from "react";
import Button from "./Button";

import {
  AiOutlinePlus,
  AiFillHome,
  AiOutlineMenu,
  AiFillStar,
} from "react-icons/Ai";

interface NavBarProps {
  functions: {
    [key: string]: () => void;
  },
}

function NavBar({ functions }: NavBarProps) {
  return (
    <div className="navbar">
      <div>
        <Button
          icon={<AiOutlineMenu />}
          onClick={functions.toggleSidebar}
        ></Button>
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
          icon={
            <img
              src="src/assets/profile_picture.png"
              alt="Icon"
              className="profile_picture"
            />
          }
        ></Button>
      </div>
    </div>
  );
}

export default NavBar;
