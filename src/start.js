import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome.js';
import App from "./app";

let thingToRender ;

if (location.pathname == '/welcome'){
    thingToRender = <Welcome />;
} else {
    thingToRender = <App />;
}

ReactDOM.render(thingToRender,
    document.querySelector('main')
);
