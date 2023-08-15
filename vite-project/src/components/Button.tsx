import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text?: ReactNode;
  extraClass?: string;
}

const Button = ({ icon, text, extraClass }: Props) => {
  return (
    <button type="button" className={"btn " + extraClass}>
      {icon} {text}
    </button>
  );
};

export default Button;
