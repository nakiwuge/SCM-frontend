import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middleware = [thunk];
const initialState = {};

const devMiddleware = composeWithDevTools(
  applyMiddleware(
    ...middleware
  )
);
const prodMiddleware = applyMiddleware(...middleware);

const finalMidleware = process.env.NODE_ENV === 'production' ?
  prodMiddleware: devMiddleware;

const Store = createStore(
  rootReducer,
  initialState,
  finalMidleware
);

export default Store;
