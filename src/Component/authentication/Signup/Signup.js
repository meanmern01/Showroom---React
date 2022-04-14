import { useState } from "react";
import { useHistory } from "react-router-dom";
import heading from "../../../assets/ideal-logo.svg";
import selectArrow from "../../../assets/select-arrow.svg";

import config from "../../../config";

const Signup = () => {
  const history = useHistory();

  const [expanded, setExpanded] = useState(false);

  const handleShowCheckboxes = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const options = [
    {
      title: "Andersson Bell Men",
      value: "anderson",
    },
    {
      title: "this is neverthat",
      value: "neverthat",
    },
    {
      title: "Unaffected",
      value: "unaffected",
    },
    {
      title: "Mother Ground",
      value: "mother",
    },
    {
      title: "kijun",
      value: "kijun",
    },
    {
      title: "Kim Matin",
      value: "kim",
    },
    {
      title: "Yunse",
      value: "yunse",
    },
    {
      title: "Common Odds",
      value: "common",
    },
    {
      title: "Kindersalmon",
      value: "kindersalmon",
    },
  ];

  const [newCompany, setNewCompany] = useState({
    company: "",
    companyEmail: "",
    name: "",
    brands: [],
  });
  const [error, setError] = useState(null);

  const handleBrands = (e) => {
    if (e.target.checked === true) {
      setNewCompany({
        ...newCompany,
        brands: [...newCompany.brands, e.target.value],
      });
    } else {
      const selectedBrand = newCompany.brands.filter((brand) => {
        if (brand === e.target.value) return false;
        return true;
      });
      setNewCompany({ ...newCompany, brands: [...selectedBrand] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Please change prod ideal_api_url in config while production*/
    fetch(`${config.ideal_api_url}/signup`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCompany),
    }).then((response) => {
      if (response.status === 409) {
        setError("This email already exists.");
      } else if (response.status === 200) {
        console.log(response);
        history.push("/signup-completed");
        setError(null);
      }
    });
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__title">
          <img src={heading} />
          <span className="signup__subheading">DIGITAL SHOWROOM</span>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="signup__form">
          {error && (
            <div className="signup__error">
              <p>{error}</p>
            </div>
          )}
          <div className="signup__input-wrapper">
            <label htmlFor="company">Company</label>
            <input
              onChange={(e) =>
                setNewCompany({ ...newCompany, company: e.target.value })
              }
              type="text"
              name="company"
              id="company"
              placeholder="Please enter your company"
            />
          </div>
          <div className="signup__input-wrapper">
            <label htmlFor="company-email">Company Email</label>
            <input
              onChange={(e) =>
                setNewCompany({ ...newCompany, companyEmail: e.target.value })
              }
              type="email"
              name="company-email"
              id="company-email"
              placeholder="Please enter your company email"
            />
          </div>
          <div className="signup__input-wrapper">
            <label htmlFor="name">{`First & Last Name`}</label>
            <input
              onChange={(e) =>
                setNewCompany({ ...newCompany, name: e.target.value })
              }
              type="text"
              name="name"
              id="name"
              placeholder="Please enter your name"
            />
          </div>
          <div className="signup__input-wrapper">
            <label htmlFor="name">Brands of Interest</label>
            <div
              className="signup__select-brands"
              style={{ position: "relative", color: "#828282" }}
              onClick={handleShowCheckboxes}
            >
              <span>Please select brands</span>
              <img src={selectArrow} />
            </div>
            <div
              className="signup__options-wrapper"
              style={{ display: expanded ? "flex" : "none" }}
            >
              <span>---select brands---</span>
              {options.map((option) => (
                <div className="signup__options">
                  <input
                    onChange={(e) => handleBrands(e)}
                    type="checkbox"
                    name={option.value}
                    id={option.value}
                    value={option.title}
                  />
                  <label htmlFor={option.value}>{option.title}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
