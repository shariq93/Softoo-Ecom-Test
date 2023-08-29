import { applyMiddleware, createStore } from 'redux';
import Reactotron from '../config/ReactotronConfig'; // Import Reactotron for debugging (if applicable)
import rootReducer, { rootEpic } from './reducers/RootReducer'; // Import your rootReducer and rootEpic
import { createEpicMiddleware } from 'redux-observable';

// Create the Redux Observable middleware
const epicMiddleware = createEpicMiddleware();

// Create the Redux store with the rootReducer and apply the Redux Observable middleware
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

// Run the rootEpic with the middleware
epicMiddleware.run(rootEpic);

export default store;
