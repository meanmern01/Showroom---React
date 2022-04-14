import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import heading from "../../../assets/ideal-logo.svg";

import config from "../../../config";

const Login = ({ urlPath, loadLoggedInUser }) => {
  const history = useHistory();

  const [companyEmail, setCompanyEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    /* Please change prod ideal_api_url in config while production*/
    fetch(`${config.ideal_api_url}/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyEmail,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 204) {
          setError(
            "It seems your account has not been registered yet. Please sign up"
          );
        } else if (response.status === 401) {
          setError("Please check your email address or password again.");
        } else if (response.status === 200) {
          setError(null);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("authToken", data.authToken);
        loadLoggedInUser(data.company);
        urlPath === "/calendar"
          ? history.push("/calendar")
          : history.push("/login-completed");
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <img src={heading} />
          <span className="login__subheading">DIGITAL SHOWROOM</span>
        </div>
        <form onSubmit={(e) => handleLogin(e)} className="login__form">
          {error && (
            <div className="login__error">
              <p>{error}</p>
            </div>
          )}
          <div className="login__input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setCompanyEmail(e.target.value)}
              type="email"
              name="company-email"
              id="company-email"
              placeholder="Please enter your email"
            />
          </div>
          <div className="login__input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Please enter your password"
            />
          </div>

          <button>Login</button>
        </form>
        <Link className="login__signup" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
