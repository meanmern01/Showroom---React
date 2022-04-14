import React from "react";
import "./Backbutton.scss";
import gsap from "gsap";
import {useHistory} from "react-router";

function TopButtons() {
    let history = useHistory();
    // gsap.set('.top_effect',{x:'-100%'},3)

    // var lines = gsap.timeline({repeat:0}).to('.top_effect',1,{x:'0%'})

    return (
        <div>
            <div className="brandButton" onClick={() => history.push("index")}>
                <button className="brand_origin">BRANDS</button>
                <button className="brand_effect">BRANDS</button>
            </div>
        </div>
    );
}

export default TopButtons;
