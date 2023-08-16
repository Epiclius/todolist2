import React, { useRef, useState} from "react";
import { useScroll, useSpring, animated } from "@react-spring/web";

const MovingBox = () => {
  const containerRef = useRef(null);
  // const [isScrolling, setIsScrolling] = useState(false);

  
  const { scrollX } = useScroll({
    onChange: ({ value: { scrollX } }) => {
      console.log("scroll value: " + scrollX);
    },
    default: {
      immediate: true,
    },
  });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest);
  });
  // const handleScroll = () => {
  //   setIsScrolling(true);

  //   // You can perform any additional actions here when scrolling occurs
  //   console.log("currently scrolling")

  //   // Clear the scrolling state after a delay
  //   clearTimeout(scrollTimeout);
  //   const scrollTimeout = setTimeout(() => {
  //     setIsScrolling(false);
  //   }, 300); // Adjust the delay as needed
  // };

  const [animationProps, setSpring] = useSpring(() => ({
    from: { x: 0 },
    to: { x: 100 },
    config: { duration: 1000 },
    loop: true,
    onRest: () => {
      console.log("reset")

    },
  }));

  return (
    <div
      ref={containerRef}
      // onScroll={handleScroll}
      style={{
        backgroundColor: "red",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
      }}
    >
      <animated.div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "blue",
          transform: animationProps.x.to((x) => `translateX(${x}px)`),
        }}
      />
    </div>
  );
};

export default MovingBox;
