import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer.js';
import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)

var store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store;