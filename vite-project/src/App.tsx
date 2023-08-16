import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import NavMenu from "./components/NavMenu";
import MyComponent from "./components/box";
import "./App.css";
import HorizontalScrollBox from "./components/ScrollingBox";
import MovingBox from "./components/infinitebox";
import { motion, useScroll } from "framer-motion";


function App() {
  const { scrollYProgress } = useScroll();

  
  const [scrollY, setScrollY] = useState(0);

  // Update scrollY state when scrolling
  // const handleScroll = () => {
  //   setScrollY(window.scrollY);
  // };

  // Attach scroll event listener
  // React.useEffect(() => {
  //   const scrollContainer = document.getElementById("scroll-container");
  //   scrollContainer?.addEventListener("scroll", handleScroll);

  //   return () => {
  //     scrollContainer?.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);


  // Create an animation based on scrollY
  // const springProps = useSpring({
  //   transform: `translateX(${scrollY}px)`, // Moves the element horizontally based on scroll
  //   config: { mass: 100, tension: 8000, friction: 125 },
  // });

  return (
    <>
      {/* <MyComponent /> */}
      <div className="divide">
        <NavMenu />

        <div>
          {/* <p>Scroll Y: {scrollY}</p> */}
          {/* <div
            id="scroll-container"
            style={{
              height: "400px", // Adjust height as needed
              overflowY: "scroll",
              background: "lightgray",
            }}
          > */}
            {/* <div style={{ height: "1000px", background: "transparent" }}>
              Scroll down to see the effect
            </div> */}
          {/* </div> */}
        </div>

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
            <div className="moving-day">
              <div>
                <motion.div style={{ scaleX: scrollYProgress }} />
              </div>
            </div>
            <div className="task-panel"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
