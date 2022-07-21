import {FETCH_USERS_DETAILS,FETCH_SINGLE_USER_DETAILS,DATA_DELETED,CHANGE_CONDUCTED_IN_DELETE,EDIT_CONDUCTED,RESET_ADDTOCONTACT_NOTIFICATION} from "./Types";
import {USER_ADDED,NO_OF_EMP,SET_ALERT_MESSAGE,CHANGE_DATA_CONDUCTED,RESET_ALERT_MESSAGE,RESET_NOTIFICATION,SET_ADDTOCONTACT_NOTIFICATION} from "./Types";
import {SET_DATATO_CARDS,RESET_CARDS_NOTIFICATION} from "./Types"

const initialState = {
  data: [],
  alertMessage: "",
  dataDeleted: false,
  noofemp: "",
  notification:false,
  addToContactNotification:false,
  cardData:[],
  dataAddedToCardsNotification:false
};

const RequestReducer = (state = initialState, action) => {
  // console.log("request reducer ",action)
  switch (action.type) {
    case FETCH_USERS_DETAILS:
      return {
        ...state,
        data: action.payload,
        
      };
    case FETCH_SINGLE_USER_DETAILS:
      return {
        ...state,
        data: action.payload,
      };
    case DATA_DELETED:
      return {
        ...state,
        dataDeleted:true,
        alertMessage:action.payload,
        notification:action.notification
      };
    case CHANGE_CONDUCTED_IN_DELETE:
      return {
        ...state,
        dataDeleted: false,
        // alertMessage: "",
     
      };
    case EDIT_CONDUCTED:
      return {
        ...state,
        alertMessage: action.payload,
        notification:action.notification
      };
    case USER_ADDED:
      return {
        ...state,
        alertMessage: action.payload,
        notification:true
      };
    case NO_OF_EMP:
      return {
        ...state, 
        noofemp: action.payload,
      };
    case CHANGE_DATA_CONDUCTED:
      return {
        ...state,
        data: [],
      };
    case SET_ALERT_MESSAGE:
      return{
        ...state,
        alertMessage:action.payload,
        notification:true,
      }
    case RESET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage:"",
      };
    case RESET_NOTIFICATION:
      return{
        ...state,
        notification:false,
        alertMessage:"",
      }
    case SET_ADDTOCONTACT_NOTIFICATION:
      return{
            ...state,
            addToContactNotification:true,
            alertMessage:action.payload
      }
    case RESET_ADDTOCONTACT_NOTIFICATION:
       return{
         ...state,
         addToContactNotification:false,
         alertMessage:""
       }
     case SET_DATATO_CARDS:
       return{
         ...state,
         cardData:action.payload,
         dataAddedToCardsNotification:true,
       }
      case RESET_CARDS_NOTIFICATION:
        return{
          ...state,
          dataAddedToCardsNotification:false
        }
    default:
      return state;
  }
};
export default RequestReducer;
