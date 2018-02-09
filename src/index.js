import React from "react";
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from 'react-hot-loader'

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

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </AppContainer>
        </Provider>,
        document.getElementById('root'),
    )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        // in all other cases - re-require App manually
        // render(require('./App'))
        render(App)
    })
}

