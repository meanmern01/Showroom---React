import React, { useEffect } from "react";
import "./BrandInfo3.scss";
import Parallax from "parallax-js";
import { useHistory, useLocation } from "react-router";

const Brandinfo3 = () => {
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
    <div className="BrandInfo3">
      <h1 id="ideal" style={{ zIndex: 2 }}>
        ideal
      </h1>
      <div className="back">
        <h2 id="BrandInfo3_back" onClick={() => history.goBack()}>
          BACK
        </h2>
      </div>
      <h1 id="BrandInfo3_upper_text">
        RECTO <br></br>MEN & WOMEN
      </h1>
      <h1 id="BrandInfo3_bottom_text">
        RECTO <br></br>MEN & WOMEN
      </h1>
      <div>
        <div
          className="photos"
          data-relative-input="true"
          id="BrandInfo3_pic_1"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo3/1.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_2"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.1"
            src="Images/BrandInfo3/2.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_3"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.3"
            src="Images/BrandInfo3/3.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_4"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo3/4.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_5"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.0"
            src="Images/BrandInfo3/5.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_6"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo3/6.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_7"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.1"
            src="Images/BrandInfo3/7.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_8"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.3"
            src="Images/BrandInfo3/8.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_9"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.6"
            src="Images/BrandInfo3/9.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_10"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo3/10.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_11"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.3"
            src="Images/BrandInfo3/11.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_12"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.1"
            src="Images/BrandInfo3/12.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_13"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo3/13.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_14"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo3/14.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_15"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo3/15.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_16"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo3/16.jpg"
            width="100% "
          ></img>
        </div>
        <div
          id="BrandInfo3_pic_17"
          className="photos"
          data-relative-input="true"
        >
          <img
            data-depth="0.2"
            src="Images/BrandInfo3/17.jpg"
            width="100% "
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Brandinfo3;
