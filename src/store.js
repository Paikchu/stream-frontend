import { createStore } from 'redux';
import dataReducer from './reducers/data';

const store = createStore(dataReducer);

export default store;
