import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { confirmLogin } from "../redux/AsyncAction";
import { resetToken } from "../redux/AsyncAction";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import img1 from "../photos/p1.png";

import { resetConfirmLogin } from "../redux/AsyncAction";
import RouteS from "./Routes/RouteS";
function NavBar(props) {
  let history = useHistory();

  const handleLogOut = (e) => {
    // console.log("15 ", e);
    props.resetConfirmLogin();
    const obj = {
      isloginin: "false",
    };
    localStorage.setItem("login", JSON.stringify(obj));
    props.resetToken();
    history.push("/");
  };

  return (
    <>
      <div className="nav-bar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <div className="React">REACT PROJECT</div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            ></button>

            <ul className="navbar-nav  mb-2 mb-lg-0  justify-content-end text-primary">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={{ pathname: `/addData`, state: { mode: "create" } }}
                >
                  ADD DATA
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={{ pathname: `/cards` }}>
                  CARDS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ color: "black" }}
                  onClick={handleLogOut}
                  to={{ pathname: `/` }}
                >
                  <img src={img1} className="image" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* <RouteS token={props.token} /> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  loginMessage: state.LRequestReducer.loginMessage,
  token: state.LRequestReducer.token,
});

const mapDispatchToProps = {
  confirmLogin,
  resetConfirmLogin,
  resetToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
