import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import register from "./register";
import login from "./login";



export default function Welcome () {
    return (
        <div>
            <HashRouter>
                <div>
                    <img className="home_page_logo" src="logo.jpg" />
                    <div className="whole">
                    Welcome.
                    </div>
                    <div>
                    RED EYE is a social network for those who can not sleep
                    </div>
                    <Route exact path="/" component= {register} />
                    <Route  path="/login" component= {login} />
                </div>
            </HashRouter>
        </div>
    );
}
