import React from "react";
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./container/login/login";
import Register from "./container/register/register";
import reducers from "./reducer";
import './config'
import AuthRoute from './component/authroute';
import Bossinfo from './container/bossinfo';

const reduxDevtools = window.devToolsExtension
    ? window.devToolsExtension()
    : f=>f;
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
) );

function Boss() {
    return <h2>Boss Pages</h2>
}

ReactDom.render(
    (<Provider store={store} >
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/bossinfo" component={Bossinfo}></Route>
                    <Route path="/boss" component={Boss}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);

