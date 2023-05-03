import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "../reducers";
import apiMiddleware from "../middleware/api";

const rootReducer = combineReducers({
  userReducer
});

const initialState = {
  data: [],
  isLoadingData: false,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  totalRecords: 0
};

const middleWare = [thunk, apiMiddleware];

if (process.env.NODE_ENV === "development") {
  middleWare.push(logger);
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
