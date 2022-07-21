import { confirmLogin } from "../redux/AsyncAction";
import { setToken } from "../redux/AsyncAction";
import { Redirect } from "react-router";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";

// import { useDispatch, useSelector } from 'react-redux';
function LoginForm(props) {
  let history = useHistory();
  const inputRef = useRef(null);

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    console.log("changess");
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function ValidateEmail(inputText) {
    var mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (mailformat.test(state.email)) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (ValidateEmail(state.email)) props.confirmLogin(state);
    else alert("You have entered an invalid email address!");
  };

  useEffect(() => {
    if (props.loginMessage === "true") {
      console.log("login useeffect");
      const obj = {
        isloginin: "true",
      };
      localStorage.setItem("login", JSON.stringify(obj));
      props.setToken();
      props.history.push("/home");
    }
  }, [props.loginMessage]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="loginform" style={{ border: "1px solid" }}>
      <Form>
        <div style={{ textAlign: "center", fontSize: "larger" }}>
          <label>LOGIN</label>
        </div>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control
              type="email"
              ref={inputRef}
              placeholder="Email"
              id="email"
              className="LoginControl1"
              value={state.email}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              className="LoginControl2"
              value={state.password}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col>
            <input type="checkbox" className="remember" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </Col>
        </Form.Group>

        <button
          className="btn btn-primary me-3 loginbtn1"
          onClick={() => {
            history.push("/signup");
          }}
        >
          SignUp
        </button>

        <button
          className="btn btn-primary me-3 loginbtn2"
          type="submit"
          onClick={handleSubmitClick}
        >
          Login
        </button>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loginMessage: state.LRequestReducer.loginMessage,
  token: state.LRequestReducer.token,
  SMessage: state.LRequestReducer.SMessage,
});

const mapDispatchToProps = {
  confirmLogin,
  setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
