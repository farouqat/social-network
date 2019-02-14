import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import register from "./register";
import login from "./login";



export default function Welcome () {
    return (
        <div>
            <HashRouter>
                <div className="whole">
                    <div className="welcome">
                        <img className="home_page_logo" src="logo.png" />
                        <h1>Welcome to RED EYE</h1>
                        <div>
                        RED EYE is a social network for those who cannot sleep at night to share their thoughts
                        </div>
                    </div>
                    <div className="welcome_components">
                        <Route exact path="/" component= {register} />
                        <Route  path="/login" component= {login} />
                    </div>
                </div>
            </HashRouter>
        </div>
    );
}
