import { gsap } from "gsap";
import "./BrandMainBanner.scss";
import { useEffect, useRef, useState } from "react";
import Parallax from "parallax-js";
import WallOne from "./WallOne";
import WallTwo from "./WallTwo";
import WallThree from "./WallThree";

function BrandMainBanner(props) {
  return (
    <div className="BrandMainBanner_01">
      <WallOne move={props.move} />
      <WallTwo move={props.move} />
      <WallThree move={props.move} />
    </div>
  );
}

export default BrandMainBanner;
