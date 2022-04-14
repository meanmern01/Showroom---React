import axios from "axios";
import React, {useState} from "react";
import {useHistory} from "react-router";
import "./Backbutton.scss";

function BottomButtons() {
    let history = useHistory();

    return (
        <div>
            <div className="calendarButton">
                <button
                    className="calendar_origin"
                    onClick={() => history.push("/calendar")}
                >
                    CALENDAR
                </button>
                <button
                    className="calendar_effect"
                    onClick={() => history.push("/calendar")}
                >
                    CALENDAR
                </button>
            </div>
        </div>
    );
}

export default BottomButtons;
