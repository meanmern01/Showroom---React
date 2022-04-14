import axios from "axios";
import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { useHistory, useLocation } from "react-router";

const Calendar = ({ loadUrlPath, loggedInUser }) => {
  const optionsArray = [
    {
      title: "WOMEN’S ADVANCED",
      options: ["KIMHEKIM", "MIN JU KIM"],
    },
    {
      title: "WOMEN'S CONTEMPORARY",
      options: ["AMOMENTO", "GU_DE", "J KOO", "KIJUN", "RECTO"],
    },
    {
      title: "ACC. & BAG",
      options: [
        "COMME SE-A",
        "GU_DE",
        "ISABELLA ETOU",
        "PROJEKT PRODUKT",
        "YY by YUUL YIE",
      ],
    },
    {
      title: "MEN'S WEAR",
      options: ["AMOMENTO", "RECTO", "thisisneverthat"],
    },
  ];

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8080/verify", {
        headers: {
          "x-access-token": localStorage.getItem("authToken"),
        },
      })
      .then((res) => {
        console.log("result of verfication : ", res);
      })
      .catch((er) => {
        console.log("result of verfication error : ", er);
        history.push("/login");
      });
  });

  const handleLogin = () => {
    history.push("/login");
    loadUrlPath(location.pathname);
  };

  const handleSignup = () => {
    history.push("/signup");
    loadUrlPath(location.pathname);
  };

  // Calendly styles and settings
  const calendlyUrl = "https://calendly.com/idealshowroom";
  const calendlyStyle = {
    width: "100%",
    height: "100%",
  };
  const pageSettings = {
    backgroundColor: "ffffff",
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: "#00a2ff",
    textColor: "#000000",
  };

  // Prefilled data while confirming appointment in Calendly
  const prefill = {
    email: loggedInUser?.companyEmail,
    name: loggedInUser?.name,
  };

  return (
    <div className="calendar">
      <div className="calendar__container">
        <div className="calendar__left">
          <div className="calendar__left-container">
            <div className="calendar__title">
              <h1>
                SPRING SUMMER 2022 <br />
                WOMEN’S MAIN DIGITAL MARKET
              </h1>
              <p>Sept. 22nd - Oct. 13th 2021</p>
              <p>Canada / US (EDT) : 6pm to 9 pm</p>
              <p>Asia / Oceania (GMT+9) : 9am to 6pm</p>
              <p>Europe (GMT+1) : 9am to 12pm</p>
            </div>

            <div className="calendar__options">
              {optionsArray.map((option) => (
                <div className="calendar__option">
                  <div className="calendar__option-title">
                    <h4>+ {option.title}</h4>
                  </div>
                  <ul className="calendar__option-options">
                    {option.options.map((option) => (
                      <li>{option}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="calendar__right">
          {localStorage.getItem("authToken") === null ? (
            <div className="calendar__right-container">
              <div className="calendar__login-title">
                <h2>
                  LOG IN TO BOOK A <br />
                  LIVE STREAMING APPOINTMENT
                </h2>
              </div>
              <div className="calendar__login-buttons">
                <button onClick={handleLogin}>LOG IN</button>
                <button onClick={handleSignup}>SIGN UP</button>
              </div>
            </div>
          ) : (
            <InlineWidget
              styles={calendlyStyle}
              pageSettings={pageSettings}
              prefill={prefill}
              url={calendlyUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
