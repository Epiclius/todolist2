import Button from "./Button";

// https://react-icons.github.io/react-icons/
import { AiOutlineMenu } from "react-icons/Ai";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/Md";

import { ThemeContext } from "./ThemeProvider";
import { useContext, useState } from "react";
import { IconContext } from "react-icons";

interface NavBarProps {
  functions: {
    [key: string]: () => void;
  };
}

function NavBar({ functions }: NavBarProps) {
  const { theme } = useContext(ThemeContext);
  const [icon, setIcon] = useState<string>("");
  const style = { style: { fontSize: "1.5rem" }, className: "react-icons" };

  const changeIcon = (state: string) => {
    if (state === "") {
      return "dark";
    }
    return "";
  };

  const toggleTheme = () => {
    functions.toggleTheme();
    setIcon((old) => changeIcon(old));
  };
  return (
    <IconContext.Provider value={(style)}>
      <div className={`${theme} navbar`}>
        <Button
          icon={<AiOutlineMenu />}
          onClick={functions.toggleSidebar}
        ></Button>
        <input type="text" placeholder="Search" />
        <Button
          icon={icon === "" ? <MdDarkMode /> : <MdOutlineLightMode />}
          onClick={toggleTheme}
        ></Button>
      </div>
    </IconContext.Provider>
  );
}

export default NavBar;
