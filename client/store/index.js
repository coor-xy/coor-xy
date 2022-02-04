import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import dataReducer from './data';
import columnsReducer from './selectColumns';
import allCharts from './charts';
import dataDBReducer from './dataDB';

const reducer = combineReducers({
  auth,
  data: dataReducer,
  userData: dataDBReducer,
  selectedColumns: columnsReducer,
  allCharts,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
