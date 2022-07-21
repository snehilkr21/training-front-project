import RequestReducer from './RequestReducer'
import LRequestReducer from './LRequestReducer'  //
const redux =require('redux')
const createStore = redux.createStore
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default

const combineReducers=redux.combineReducers         //
const rootReducer=combineReducers({                 //
    RequestReducer: RequestReducer,                               //
    LRequestReducer: LRequestReducer                     //
})                                                  //

// const store =createStore(RequestReducer,applyMiddleware(thunkMiddleware))

const store =createStore(rootReducer,applyMiddleware(thunkMiddleware))

export default store