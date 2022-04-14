import React, { useEffect } from "react";
import "./Brandinfo1.scss";
import Parallax from "parallax-js";
import { useHistory, useLocation } from "react-router";

const Brandinfo1 = () => {
  const { pathname } = useLocation();
  let history = useHistory();
  useEffect(() => {
    setTimeout(function () {
      const pic_container = document.getElementsByClassName("photos");
      for (let i = 0; i < pic_container.length; i++) {
        let parallaxInstance = new Parallax(pic_container[i], {
          relativeInput: true,
        });
        parallaxInstance.friction(0.2, 0.2);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const ful_pic = () => {
    var img = document.getElementById("pic_1");

    // function toEnlarge_pic() {
    img.style.transform = "scale(1.5)";
    img.style.width = "100%";
    img.style.transition = "transform 0.25s ease";
    // }
    // img.sty
  };

  return (
    <div className="Brandinfo">
      <h1 id="ideal">ideal</h1>
      <h1 id="upper_text">
        RECTO <br></br>MEN & WOMEN
      </h1>
      <div className="back">
        <h2 onClick={() => history.goBack()} id="BrandInfo1_back">
          BACK
        </h2>
      </div>

      <h1 id="bottom_text">
        RECTO <br></br>MEN & WOMEN
      </h1>
      <div>
        <div className="photos" data-relative-input="true" id="pic_1">
          <img
            // data-depth="0.2"
            src="Images/BrandInfo1/1.jpg"
            width="100% "
            onClick={() => {
              ful_pic();
            }}
          ></img>
        </div>
        <div id="pic_2" className="photos" data-relative-input="true">
          <img
            data-depth="0.1"
            src="Images/BrandInfo1/2.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_3" className="photos" data-relative-input="true">
          <img
            data-depth="0.3"
            src="Images/BrandInfo1/3.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_4" className="photos" data-relative-input="true">
          <img
            data-depth="0.6"
            src="Images/BrandInfo1/4.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_7" className="photos" data-relative-input="true">
          <img
            data-depth="0.1"
            src="Images/BrandInfo1/7.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_8" className="photos" data-relative-input="true">
          <img
            data-depth="0.2"
            src="Images/BrandInfo1/8.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_6" className="photos" data-relative-input="true">
          <img
            data-depth="0.0"
            src="Images/BrandInfo1/6.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_9" className="photos" data-relative-input="true">
          <img
            data-depth="0.3"
            src="Images/BrandInfo1/9.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_10" className="photos" data-relative-input="true">
          <img
            data-depth="0.6"
            src="Images/BrandInfo1/10.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_11" className="photos" data-relative-input="true">
          <img
            data-depth="0.2"
            src="Images/BrandInfo1/11.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_12" className="photos" data-relative-input="true">
          <img
            data-depth="0.3"
            src="Images/BrandInfo1/12.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_13" className="photos" data-relative-input="true">
          <img
            data-depth="0.1"
            src="Images/BrandInfo1/13.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_14" className="photos" data-relative-input="true">
          <img
            data-depth="0.2"
            src="Images/BrandInfo1/14.jpg"
            width="100% "
          ></img>
        </div>
        <div id="pic_15" className="photos" data-relative-input="true">
          <img
            data-depth="0.2"
            src="Images/BrandInfo1/15.jpg"
            width="100% "
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Brandinfo1;
