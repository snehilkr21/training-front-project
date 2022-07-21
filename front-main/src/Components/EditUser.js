import React, { Component } from "react";
import { addUser } from "../redux/AsyncAction";
import { editUser } from "../redux/AsyncAction";
import { singleUser } from "../redux/AsyncAction";
import { changeData } from "../redux/AsyncAction";
import { noOfEmp } from "../redux/AsyncAction";
import { resetNotification } from "../redux/AsyncAction";
import { connect } from "react-redux";
import Alert from "react-bootstrap/Alert";
import "../CssFile/Color.css";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      body: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    if (
      this.props.location?.state?.mode === "edit" ||
      this.props.location?.state?.mode === "view"
    ) {
      const { id } = this.props.match.params;
      this.props.singleUser(id);
    }
    if (this.props.location?.state?.mode === "create") {
      this.props.noOfEmp();
      this.setState({
        id: this.state.id,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("43","edit",this.props.data !== prevProps.data,"current",this.props.data,"previous", prevProps.data);
    if (this.props.data !== prevProps.data && this.props.data.length > 0) {
      this.setState({
        id: this.props.data[0]?.id,
        title: this.props.data[0]?.title,
        body: this.props.data[0]?.body,
      });
    }

    if (
      this.props.location?.state?.mode === "create" &&
      this.props.data.length > 0
    ) {
      this.props.changeData();
      // this.props.noOfEmp()
      this.setState({
        id: this.props.noofemp,
        title: "",
        body: "",
      });
    }
    // if (this.props.loginMessage === "false") this.props.history.push("/home");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("static", nextProps.location.pathname);
    const newState = { ...prevState };
    if (
      nextProps.noofemp !== prevState.id &&
      nextProps.data !== [] &&
      nextProps.location.pathname === "/addData"
    ) {
      newState.id = nextProps.noofemp;
    }
    return newState; // No change to state
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body,
    };
    if (this.props.location?.state?.mode === "edit") {
      this.props.editUser(user);
    } else if (this.props.location?.state?.mode === "create") {
      this.props.addUser(user);
    }
  };

  modalclose = () => {
    this.props.resetNotification();
  };

  render() {
    let temp = this.props.location?.state?.mode;
    let isSel = this.state.title.length > 0 && this.state.body.length > 0;

    return (
      <div>
        {this.props.notification === true ? (
          <Alert variant="primary" className="Alerttt">
            <Alert.Heading className="AlertttMessage">
              {this.props.alertMessage}
              <button
                type="button"
                onClick={() => this.modalclose()}
                className="btn-close"
                style={{ float: "right" }}
              ></button>
            </Alert.Heading>
          </Alert>
        ) : null}

        {temp === "edit" ? (
          <div className="label11">EDIT USER</div>
        ) : (
          <div></div>
        )}
        {temp === "view" ? <div className="label11">VIEW</div> : <div></div>}
        {temp === "create" ? (
          <div className="label11">ADD USER</div>
        ) : (
          <div></div>
        )}
        <form onSubmit={this.handleSubmit} className="editform">
          <div className="editDiv">
            <div>
              <label htmlFor="id" className="form-label1">
                ID
              </label>
              <input
                type="number"
                className="form-control"
                disabled={
                  temp === "create" || temp === "view" || temp === "edit"
                    ? true
                    : false
                }
                name="id"
                value={this.state.id}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label1">
                TITLE
              </label>
              <input
                type="text"
                className="form-control"
                disabled={temp === "view" ? true : false}
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="body" className="form-label1">
                BODY
              </label>
              <input
                type="text"
                className="form-control"
                disabled={temp === "view" ? true : false}
                name="body"
                value={this.state.body}
                onChange={this.handleChange}
              />
            </div>

            <button
              className="btn btn-primary me-2 editbtn1"
              onClick={() => {
                this.props.history.push("/home");
                this.props.resetNotification();
              }}
            >
              Back
            </button>

            {["create", "edit"].includes(temp) && (
              <button
                type="submit"
                disabled={!isSel}
                className="btn btn-primary me-2 editbtn2"
              >
                {temp === "edit" ? "Modify" : "Add User"}
              </button>
            )}
            {/* {temp==="create"&&<button type="submit"  type="submit"  className="btn btn-primary me-2" >Create User</button>} */}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.RequestReducer.data,
  noofemp: state.RequestReducer.noofemp,
  alertMessage: state.RequestReducer.alertMessage,
  notification: state.RequestReducer.notification,
  loginMessage: state.LRequestReducer.loginMessage,
});

const mapDispatchToProps = {
  addUser,
  editUser,
  singleUser,
  changeData,
  noOfEmp,
  resetNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
