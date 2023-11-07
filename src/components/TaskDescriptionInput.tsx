import { useState, ChangeEvent, useEffect } from "react";

interface DescriptionInputProps {
  initialText: string;
  placeholder: string;
  textareaID: string;
  onTextChange: (newText: string) => void;
}

export default function DescriptionInput({
  initialText,
  placeholder,
  textareaID,
  onTextChange,
}: DescriptionInputProps) {
  const [text, setText] = useState(initialText);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  function autoResize() {
    const textArea = document.getElementById(textareaID) as HTMLTextAreaElement;
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  }

  useEffect(() => {
    autoResize();
  }, [text]);

  return (
    <div>
      <textarea
        placeholder={placeholder}
        className="textarea"
        id={textareaID}
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}