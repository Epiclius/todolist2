import React, { useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

const HorizontalScrollBox = () => {
  // detect scrolling up or down
  const scrollRef = useRef(null);
  const [props, api] = useSpring(() => ({
    scroll: 0,
    config: { mass: 1, tension: 180, friction: 12 },
  }));

};

export default HorizontalScrollBox;
