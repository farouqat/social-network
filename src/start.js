import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome.js';

let thingToRender ;

if (location.pathname == '/welcome'){
    thingToRender = <Welcome />;
} else {
    thingToRender = <img src="/logo.jpg" />;
}

ReactDOM.render(thingToRender,
    document.querySelector('main')
);
