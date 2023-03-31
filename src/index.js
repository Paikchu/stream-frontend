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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd/dist/antd.min.css" />

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    /*<React.StrictMode>
        <Provider store={store}>
            <Library />
        </Provider>
    </React.StrictMode>*/
    <Cart />
);