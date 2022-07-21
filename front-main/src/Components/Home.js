import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import { fetchUsers } from "../redux/AsyncAction";
import { removeUsers } from "../redux/AsyncAction";
import { resetDelete } from "../redux/AsyncAction";
import { resetNotification } from "../redux/AsyncAction";
import { dataAddedToContact } from "../redux/AsyncAction";
import { resetAddToContactNotification } from "../redux/AsyncAction";
import validator from "validator";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";

import "../CssFile/Color.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      show: false,
      firstName: "",
      lastName: "",
      mobNo: "",
      feedBack: "",
      email: "",
      emailError: "",
      mobNoError: "",
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  deleteUser(id) {
    this.props.removeUsers(id);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dataDeleted === true) {
      this.props.fetchUsers();
      this.props.resetDelete();
    }
    // if (this.props.loginMessage === "false") this.props.history.push("/");
  }

  //starting of modal implementation
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleFirstName = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };

  handleLastName = (e) => {
    this.setState({
      lastName: e.target.value,
    });
  };

  handleMobileNo = (e) => {
    var tempMobNo = e.target.value;
    this.setState({
      mobNo: e.target.value,
    });
    if (tempMobNo.toString().length === 10) {
      this.setState({
        mobNoError: "",
      });
    } else {
      this.setState({
        mobNoError: "Pl Enter A Valid No",
      });
    }
  };

  handleEmail = (e) => {
    var tempEmail = e.target.value;
    this.setState({
      email: e.target.value,
    });
    if (validator.isEmail(tempEmail)) {
      this.setState({
        emailError: "",
      });
    } else {
      this.setState({
        emailError: "Pl eneter a valid email",
      });
    }
  };

  handleFeedback = (e) => {
    this.setState({
      feedBack: e.target.value,
    });
  };

  handleSubmitModal = (e) => {
    this.hideModal();
    e.preventDefault();

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobNo: this.state.mobNo,
      email: this.state.email,
      feedBack: this.state.feedBack,
    };
    let temp1 = user.mobNo;
    let temp2 = user.email;
    if (temp1.toString().length === 10 && validator.isEmail(temp2))
      this.props.dataAddedToContact(user);
    else alert("pl check phone no and mail id again");
  };

  handleReset = () => {
    this.setState({
      firstName: "",
      lastName: "",
      mobNo: "",
      email: "",
      feedBack: "",
      emailError: "",
      mobNoError: "",
    });
  };

  alertclose = () => {
    this.props.resetNotification();
  };
  toastClose = () => {
    this.props.resetAddToContactNotification();
  };

  render() {
    // console.log("143",this.props.addToContactNotification)
    return (
      <div>
        {this.props.notification === true ? (
          <Alert variant="danger" className="Alerttt">
            <Alert.Heading className="AlertttMessage">
              {this.props.alertMessage}
              <button
                type="button"
                onClick={() => this.alertclose()}
                className="btn-close"
                style={{ float: "right" }}
              ></button>
            </Alert.Heading>
          </Alert>
        ) : null}

        {this.props.addToContactNotification === true ? (
          <div className="HomeToast " variant="primary">
            <Toast style={({ color: "black" }, { backgroundColor: "skyblue" })}>
              <button
                type="button"
                onClick={() => this.toastClose()}
                className="btn-close me-2 "
                style={{ float: "right" }}
              ></button>
              <Toast.Body>{this.props.alertMessage}</Toast.Body>
            </Toast>
          </div>
        ) : null}

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.NO.</th>
              <th scope="col">ID</th>
              <th scope="col">TITLE</th>
              <th scope="col">BODY</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((user, index) => {
              return (
                <tr key={index}>
                  <td key={index + 1}>{index + 1}</td>
                  <td key={index + 2}>{user.id}</td>
                  <td key={index + 3}>{user.title}</td>
                  <td key={index + 4}>{user.body}</td>
                  <td key={index + 5}>
                    <Link
                      className="btn btn-primary me-2"
                      to={{
                        pathname: `/edituser/${user.id}`,
                        state: { mode: "view" },
                      }}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-secondary me-2"
                      to={{
                        pathname: `/edituser/${user.id}`,
                        state: { mode: "edit" },
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => {
                        this.deleteUser(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* modal box */}
        <div>
          <button
            className="btn btn-primary me-5"
            onClick={() => {
              this.showModal();
            }}
            style={{ float: "right" }}
          >
            {" "}
            CLICK HERE
          </button>
          {this.props.addToContactNotification === false &&
          this.state.show === true ? (
            <Modal show={this.state.show} onHide={this.hideModal}>
              <Modal.Dialog className="modalHomeDialog">
                <Modal.Header className="modalHomeHeader">
                  <Modal.Title>Fill Up The Form</Modal.Title>
                  <button
                    type="button"
                    onClick={this.hideModal}
                    className="btn-close"
                  ></button>
                </Modal.Header>

                <Modal.Body className="modalHomeBody">
                  <form onSubmit={this.handleSubmitModal}>
                    {/* <div className="homeDiv"> */}
                    <div className="mb-3">
                      <label htmlFor="id" className="form-labelHome">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-controlHome"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleFirstName}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="title" className="form-labelHome">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-controlHome"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleLastName}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="body" className="form-labelHome">
                        Mobile No
                      </label>
                      <input
                        type="number"
                        className="form-controlHome"
                        name="mobNo"
                        value={this.state.mobNo}
                        onChange={this.handleMobileNo}
                      />
                    </div>
                    {this.state.mobNo.length > 0 ? (
                      <span style={{ fontWeight: "bold", color: "red" }}>
                        {this.state.mobNoError}
                      </span>
                    ) : null}

                    <div className="mb-3">
                      <label htmlFor="body" className="form-labelHome">
                        Email Id
                      </label>
                      <input
                        type="email"
                        className="form-controlHomeE"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleEmail}
                      />
                    </div>
                    {this.state.emailError.length > 0 ? (
                      <span style={{ fontWeight: "bold", color: "red" }}>
                        {this.state.emailError}
                      </span>
                    ) : null}

                    <div className="mb-3">
                      <label htmlFor="body" className="form-labelHome">
                        feedBack
                      </label>
                      <input
                        type="textarea"
                        className="form-controlHomeF"
                        name="feedBack"
                        value={this.state.feedBack}
                        onChange={this.handleFeedback}
                      />
                    </div>
                    {/* </div> */}
                  </form>
                </Modal.Body>

                <Modal.Footer className="modalHomeFooter">
                  <button
                    className="btn btn-primary em-2 "
                    onClick={this.handleReset}
                  >
                    Clear
                  </button>
                  <button
                    className="btn btn-primary em-2 "
                    type="submit"
                    onClick={this.handleSubmitModal}
                  >
                    Save It
                  </button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.RequestReducer.data,
  dataDeleted: state.RequestReducer.dataDeleted,
  alertMessage: state.RequestReducer.alertMessage,
  notification: state.RequestReducer.notification,
  addToContactNotification: state.RequestReducer.addToContactNotification,
  loginMessage: state.LRequestReducer.loginMessage,
});

const mapDispatchToProps = {
  fetchUsers,
  removeUsers,
  resetDelete,
  dataAddedToContact,
  resetNotification,
  resetAddToContactNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
