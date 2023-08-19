import React, { useState, useEffect } from "react";

const ScrollSpeedDetector: React.FC = () => {
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [prevTimestamp, setPrevTimestamp] = useState(0);

  const handleScroll = () => {
    const currentTimestamp = Date.now();
    console.log("")
    if (prevTimestamp !== 0) {
      const deltaTime = currentTimestamp - prevTimestamp;
      const scrollY = window.scrollY;

      const speed = Math.abs(scrollY - scrollSpeed) / deltaTime;
      
      console.log("33");
      console.log("yo mama: " + Math.round(speed * 10000));
      console.log("speed: " + speed);
      setScrollSpeed(speed);
    }

    console.log("scroll speed", scrollSpeed);
    setPrevTimestamp(currentTimestamp);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    </>
  );
};

export default ScrollSpeedDetector;
