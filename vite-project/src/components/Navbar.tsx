import Button from "./Button";

// https://react-icons.github.io/react-icons/
import { AiOutlineMenu, AiFillDislike } from "react-icons/Ai";
import { ThemeContext } from "./ThemeProvider";
import { useContext } from "react";

interface NavBarProps {
  functions: {
    [key: string]: () => void;
  };
}

function NavBar({ functions }: NavBarProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme} navbar`}>
      <Button
        icon={<AiOutlineMenu />}
        onClick={functions.toggleSidebar}
      ></Button>
      <input type="text" placeholder="Search" />
      <Button icon={<AiFillDislike />} onClick={functions.toggleTheme}></Button>
    </div>
  );
}

export default NavBar;
