import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome.js';
import App from "./app";
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer.js';
import { Provider } from 'react-redux';
import { initSocket } from './socket.js';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));


let thingToRender ;

if (location.pathname == '/welcome'){
    thingToRender = <Welcome />;
} else {
    thingToRender =(initSocket(store),

    <Provider store={store}>
        <App />
    </Provider>    );
    
}


ReactDOM.render(thingToRender,
    document.querySelector('main')
);
