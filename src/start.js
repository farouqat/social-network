import React from 'react';
import ReactDOM from 'react-dom';

import Register from "./register.js";
import Welcome from './welcome.js';

let thingToRender ;

if (location.pathname == '/welcome'){
    thingToRender = <div>
        <Welcome />
        <Register />
    </div>;
} else {
    thingToRender = <img src="/logo.jpg" />;
}

ReactDOM.render(thingToRender,
    document.querySelector('main')
);
