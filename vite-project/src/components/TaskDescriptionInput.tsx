import React, { useState, ChangeEvent } from "react";

interface DescriptionInputProps {
  initialText: string;
  placeholder: string;
  onTextChange: (newText: string) => void; // Define the callback function type
}

export default function DescriptionInput({
  initialText,
  placeholder,
  onTextChange,
}: DescriptionInputProps) {
  const [text, setText] = useState(initialText);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  return (
    <div>
      <textarea
        placeholder={placeholder}
        className="textarea"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}