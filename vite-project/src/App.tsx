import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import NavMenu from "./components/NavMenu";
import MyComponent from "./components/box";
import "./App.css";

function App() {

  // const [scrollY, setScrollY] = useState(0);

  // // Update scrollY state when scrolling
  // const handleScroll = () => {
  //   setScrollY(window.scrollY);
  // };

  // // Attach scroll event listener
  // React.useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // Create an animation based on scrollY
  const springProps = useSpring({
    from: { transform: "translateX(0%)" },
    to: { transform: "translateX(100%)" },
    config: { duration: 1000, loop: true },
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

      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "flex" }}>
          <animated.div
            style={{
              width: "10vw", // Make sure the element covers the viewport width
              height: 80,
              background: "#000000",
              borderRadius: 8,
              ...springProps,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
