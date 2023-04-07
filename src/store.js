import { createStore } from 'redux';
import { combineReducers } from "redux";
import dataReducer from './reducers/dataReducer';
import userReducer from './reducers/userReducer'


const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(rootReducer);

export default store;
