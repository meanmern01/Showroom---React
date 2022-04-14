import Parallax from "parallax-js";
import "./BrandMainBanner.scss";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

function WallTwo(props) {
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
    // console.log("Wall Two entry: ", entry.isIntersecting);
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
          onClick={() => history.push("/brandinfo2")}
          className="ideal_showroom cursor"
        >
          Wall Two
        </h2>
      )}
      <div className="wallTwo">
        <div className="wallTwo_left">
          <a className="fifth photos" data-relative-input="true">
            <img
              data-depth="0.4"
              className="cursor"
              onClick={() => history.push("/brandinfo2")}
              src="Images/BrandMainBanner/5.jpg"
            />
          </a>
        </div>
        <div className="wallTwo_right">
          <a className="sixth photos" data-relative-input="true">
            <img
              data-depth="0.2"
              className="cursor"
              onClick={() => history.push("/brandinfo2")}
              src="Images/BrandMainBanner/6.jpg"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default WallTwo;
