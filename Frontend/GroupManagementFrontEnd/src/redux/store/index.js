import { createStore } from "redux";
import rootReducer from "../reducers/index";
import thunk  from "redux-thunk"
import { applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
    composeWithDevTools(
        applyMiddleware(thunk)
      )
)
export default store;
