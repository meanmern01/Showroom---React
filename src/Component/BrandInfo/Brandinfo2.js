import React, { useEffect } from "react";
import "./Brandinfo2.scss";
import Parallax from "parallax-js";
import { useHistory, useLocation } from "react-router";

const Brandinfo2 = () => {
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
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="Brandinfo2">
      <h1 id="ideal">ideal</h1>
      <h1 id="Brandinfo2_upper_text">
        RECTO <br></br>MEN & WOMEN
      </h1>
      <div className="back">
        <h2 onClick={() => history.goBack()} id="BrandInfo2_back">
          BACK
        </h2>
      </div>
      <h1 id="Brandinfo2_bottom_text">
        RECTO <br></br>MEN & WOMEN
      </h1>
      <div>
        <div
          className="photos"
          data-relative-input="true"
          id="Brandinfo2_pic_1"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo2/1.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_2"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.1"
            src="Images/BrandInfo2/2.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_3"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.3"
            src="Images/BrandInfo2/3.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_4"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo2/4.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_5"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.0"
            src="Images/BrandInfo2/5.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_6"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo2/6.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_7"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.1"
            src="Images/BrandInfo2/7.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_8"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.3"
            src="Images/BrandInfo2/8.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_9"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.6"
            src="Images/BrandInfo2/9.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_10"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo2/10.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_11"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.3"
            src="Images/BrandInfo2/11.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_12"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.1"
            src="Images/BrandInfo2/12.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_13"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo2/13.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_14"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo2/14.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_15"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo2/15.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="Brandinfo2_pic_16"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo2/16.jpg"
            width="100% "
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Brandinfo2;
