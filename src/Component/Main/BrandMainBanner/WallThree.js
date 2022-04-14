import Parallax from "parallax-js";
import "./BrandMainBanner.scss";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

function WallThree(props) {
  const containerRef = useRef(null);
  let history = useHistory();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    var scene3 = document.getElementsByClassName("photos");
    for (let i = 0; i < scene3.length; i++) {
      var parallaxInstance = new Parallax(scene3[i], {
        relativeInput: true,
      });
      parallaxInstance.friction(0.2, 0.2);
    }
  }, []);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    // console.log("Wall Three entry: ", entry.isIntersecting);
    setIsVisible(entry.isIntersecting);
  };
  const options = {
    root: null,
    // rootMargin: "100px",
    threshold: 0.3,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, options]);

  return (
    <div ref={containerRef}>
      {isVisible && (
        // props.move &&
        <h2
          className="ideal_showroom cursor"
          onClick={() => history.push("/brandinfo3")}
        >
          Wall Three
        </h2>
      )}
      <div className="wallThree">
        <div className="left_wall_three">
          <a className="eighth photos" data-relative-input="true">
            <img
              data-depth="0.3"
              className="cursor"
              onClick={() => history.push("/brandinfo3")}
              src="Images/BrandMainBanner/8.jpg"
            />
          </a>
        </div>
        <div className="right_wall_three">
          <a className="seventh photos" data-relative-input="true">
            <img
              data-depth="0.2"
              className="cursor"
              onClick={() => history.push("/brandinfo3")}
              src="Images/BrandMainBanner/7.jpg"
            />
          </a>
          <a className="ninth photos" data-relative-input="true">
            <img
              data-depth="0.6"
              className="cursor"
              onClick={() => history.push("/brandinfo3")}
              src="Images/BrandMainBanner/9.jpg"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default WallThree;
