
import reducer from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(saga);






