import React, { useState, ChangeEvent } from "react";

export default function DescriptionInput({ initialText = "" }) {
  const [text, setText] = useState(initialText);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <textarea className="textarea" value={text} onChange={handleChange} />
    </div>
  );
}

// https://gist.github.com/peterholak/3b9f728c1df50214c8cd7fde4946d58a
