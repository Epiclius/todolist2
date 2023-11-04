import { useContext, useState, ReactNode, useRef, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/Bs";
import { ThemeContext } from "./ThemeProvider";

interface DropDownProps {
  icon?: ReactNode;
  defaultSelection: string;
  selection: string[];
  select: (item: string) => void;
}

export default function DropDown({ icon, defaultSelection, selection, select }: DropDownProps) {
  const priorityContainerRef = useRef<HTMLDivElement>(null);
  const priorityModalRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selected, setSelected] = useState(defaultSelection);
  const { theme } = useContext(ThemeContext);
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);


  const handleSelection = (item: string) => {
    setSelected(item);
    select(item);
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleToggle = () => {
    setShowPriorityPicker(!showPriorityPicker);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        priorityContainerRef.current &&
        priorityModalRef.current &&
        !priorityModalRef.current.contains(event.target as Node) &&
        !priorityContainerRef.current.contains(event.target as Node)
      ) {
        setShowPriorityPicker(false);
      }
    };

    if (showPriorityPicker) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPriorityPicker]);

  return (
    <div ref={priorityContainerRef} className={`dropdown ${theme}`}>
      <div
        className={`dropdown-button ${isHovered ? "hovered" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleToggle}
      >
        <span className={"priority-level-name"}>
          {icon} {selected}
          {showPriorityPicker ? <BsChevronUp /> : <BsChevronDown />}
        </span>
      </div>
      {showPriorityPicker && (
        <>
          <div
            className="modal-overlay"
            onClick={() => {
              setShowPriorityPicker(false);
            }}
          />
          <div className="dropdown-menu-modal" ref={priorityModalRef}>
            {selection.map((item) => (
              <div
                className={`dropdown-item ${
                  item === defaultSelection ? "selected" : ""
                }`}
                key={item}
                onClick={() => {
                  handleSelection(item);
                  handleToggle();
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}