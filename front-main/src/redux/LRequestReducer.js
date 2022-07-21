import {
  LOGIN_DETAILS,
  RESET_CONFIRM_LOGIN,
  SIGNUP_DETAILS,
  RESET_SIGNUP,
  SET_TOKEN,
  RESET_TOKEN,
} from "./Types";

const initialState = {
  loginMessage: "false",
  SMessage: "",
  token: false,
};

const LRequestReducer = (state = initialState, action) => {
  // console.log("request reducer ",action)
  switch (action.type) {
    case LOGIN_DETAILS:
      return {
        ...state,
        loginMessage: action.payload,
      };
    case RESET_CONFIRM_LOGIN: {
      return {
        ...state,
        loginMessage: "false",
      };
    }
    case SIGNUP_DETAILS: {
      return {
        ...state,
        SMessage: action.payload,
      };
    }
    case RESET_SIGNUP: {
      return {
        ...state,
        SMessage: "",
      };
    }
    case SET_TOKEN: {
      return {
        ...state,
        token: true,
      };
    }
    case RESET_TOKEN: {
      return {
        ...state,
        token: false,
      };
    }

    default:
      return state;
  }
};
export default LRequestReducer;
