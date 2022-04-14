import { Link } from "react-router-dom";
import heading from "../../../assets/ideal-logo.svg";
import arrow from "../../../assets/arrow-button.svg";

const LoginCompleted = () => {
  return (
    <div className="login-completed">
      <div className="login-completed__container">
        <div className="login-completed__title">
          <img src={heading} />
          <span className="login-completed__subheading">DIGITAL SHOWROOM</span>
        </div>
        <span>
          Welcome <br />
          Access Granted
        </span>
        <Link to="/">
          <img src={arrow} />
        </Link>
      </div>
    </div>
  );
};

export default LoginCompleted;
