import { Link } from "react-router-dom";
import heading from "../../../assets/ideal-logo.svg";
import arrow from "../../../assets/arrow-button.svg";

const SignupCompleted = () => {
  return (
    <div className="login-completed">
      <div className="login-completed__container">
        <div className="login-completed__title">
          <img src={heading} />
          <span className="login-completed__subheading">DIGITAL SHOWROOM</span>
        </div>
        <span>
          Thanks for your access request. <br />
          Your request will be accepted after review. <br />
          <br />
          for inquiry, <br />
          general@idealppl.com
        </span>
        <Link to="/">
          <img src={arrow} />
        </Link>
      </div>
    </div>
  );
};

export default SignupCompleted;
