import { ReactNode, useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

interface Props {
  icon?: ReactNode;
  text?: string;
  extraClass?: string;
  onClick?: () => void;
}

const Button = ({ icon, text, extraClass, onClick }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button type="button" className={`btn ${extraClass} ${theme}`} onClick={onClick}>
      {icon} {text}
    </button>
  );
};

export default Button;
