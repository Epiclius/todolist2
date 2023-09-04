import { ReactNode, useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

interface Props {
  icon?: ReactNode;
  text?: string;
  extraClass?: string;
  onClick?: () => void;
  reference?: React.RefObject<HTMLButtonElement> | null;
  onMouseEvents?: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

const Button = ({ icon, text, extraClass, reference = null, onClick, onMouseEvents }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      {...onMouseEvents}
      ref={reference}
      type="button"
      className={`btn ${extraClass} ${theme}`}
      onClick={onClick}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
