import Button from "./Button";

import {
  AiOutlinePlus,
  AiFillHome,
  AiOutlineMenu,
  AiFillStar,
} from "react-icons/Ai";

const NavMenu = () => {
  return (
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
};

export default NavMenu;
