import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import {Provider} from "react-redux";
import store from './store.js'
import Library from './components/Library.js'
import Order from './components/Order.js'
import Cart from './components/Cart.js'
import './css/library.css';
import './css/GameOrderList.css';
import './css/Cart.css';
import './/Bootstrap/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>,

);