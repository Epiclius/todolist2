import React, { useState, useEffect } from "react";

interface MessageProps {
    message: string;
    count: number;
    userName: string;
}

function MessageDisplay({ message, count, userName }: MessageProps) {
  useEffect(() => {
    // This code runs whenever 'count' changes
    console.log(`Count changed to: ${count}`);
  }); // 'count' is the dependency

  return (
    <div>
      <p>{message}</p>
      <p>Count: {count}</p>
      <p>User: {userName}</p>
    </div>
  );
}

export default MessageDisplay;
