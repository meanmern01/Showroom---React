import React from "react";
import "./Backbutton.scss";

function Backbutton({isDsPage}) {
    return (
        <div
            className="backButton"
            style={{
                background: isDsPage ? "black" : "white",
                color: isDsPage ? "white" : "black",
            }}
        >
            <button className="origin">BACK</button>
            <button className="effect">BACK</button>
        </div>
    );
}

export default Backbutton;
