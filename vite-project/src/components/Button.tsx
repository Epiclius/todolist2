import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text?: ReactNode;
  extraClass?: string;
  onClick: () => void;
}

const Button = ({ icon, text, extraClass, onClick }: Props) => {
  return (
    <button type="button" className={"btn " + extraClass} onClick={onClick}>
      {icon} {text}
    </button>
  );
};

export default Button;
