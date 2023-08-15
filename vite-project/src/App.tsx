import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import NavMenu from "./components/NavMenu";
import MyComponent from "./components/box";
import "./App.css";

function App() {

  const [scrollY, setScrollY] = useState(0);

  // Update scrollY state when scrolling
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // Attach scroll event listener
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Create an animation based on scrollY
  const springProps = useSpring({
    transform: `translateX(${scrollY}px)`, // Moves the element horizontally based on scroll
    config: { mass: 1, tension: 200, friction: 25 },
  });

  return (
    <>
      {/* <MyComponent /> */}
      <div className="divide">
        <NavMenu />

        <div className="container">
          <div className="sidebarMenu">
            <a href="#" className="logo">
              <span className="logo-text">Logo</span>
            </a>
            <a href="#" className="logo">
              <span className="logo-text">Logo</span>
            </a>
            <a href="#" className="logo">
              <span className="logo-text">Logo</span>
            </a>
          </div>

          <div className="golden-container">
            <div className="moving-day"></div>
            <div className="task-panel"></div>
          </div>
        </div>
      </div>

      <div style={{ height: "200vh" }}>
        {" "}
        {/* Adds some height to the content */}
        <animated.div
          style={{
            width: 80,
            height: 80,
            background: "#ff6d6d",
            borderRadius: 8,
            ...springProps,
          }}
        />
      </div>
    </>
  );
}

export default App;
