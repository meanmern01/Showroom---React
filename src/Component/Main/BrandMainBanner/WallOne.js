import Parallax from "parallax-js";
import "./BrandMainBanner.scss";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

function WallOne(props) {
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
    // console.log("wall one entry: ", entry.isIntersecting);
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
          onClick={() => history.push("/brandinfo1")}
          className="ideal_showroom cursor"
        >
          Wall One
        </h2>
      )}
      {/* <h2 className="ideal_showroom">Wall One</h2> */}
      <div className="wallOne">
        <div className="wallOne_left">
          <a className="first photos">
            <img
              data-depth="0.2"
              className="cursor"
              onClick={() => history.push("/brandinfo1")}
              src="Images/BrandMainBanner/1.jpg"
            />
          </a>
          <a className="fourth photos" data-relative-input="true" id="scene1">
            <img
              data-depth="0.6"
              className="cursor"
              onClick={() => history.push("/brandinfo1")}
              src="Images/BrandMainBanner/4.jpg"
            />
          </a>
        </div>
        <div className="wallOne_right" data-relative-input="true" id="scene2">
          <a className="second photos" data-relative-input="true" id="scene1">
            <img
              data-depth="0.3"
              className="cursor"
              onClick={() => history.push("/brandinfo1")}
              src="Images/BrandMainBanner/2.jpg"
            />
          </a>
          <a className="third photos" data-relative-input="true" id="scene1">
            <img
              data-depth="0.4"
              className="cursor"
              onClick={() => history.push("/brandinfo1")}
              src="Images/BrandMainBanner/3.jpg"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default WallOne;
