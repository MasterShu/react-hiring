import React from "react";
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import App from './App';
import reducers from "./reducer";
import './index.css'
import './config'

const reduxDevtools = window.devToolsExtension
    ? window.devToolsExtension()
    : f=>f;
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
) );

ReactDom.render(
    (<Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);

