import React from "react";
import axios from './axios';
import ProfilePic from "./profilepic.js";
import Uploader from "./uploader";
import Profile from "./profile.js";
import OtherProfile from './otherprofile';
import { BrowserRouter , Route } from 'react-router-dom';
import Friends from './friends';
import Onlines from './onlines';
import Chat from './chat';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
        };
        this.setImage = this.setImage.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        axios.get('/user').then((results) => {
            this.setState({
                first: results.data.rows[0].first,
                last: results.data.rows[0].last,
                id: results.data.rows[0].id,
                profilepic_url: results.data.rows[0].profilepic_url,
                bio: results.data.rows[0].bio
            });
        });
    }
    setImage(image){
        this.setState({
            profilepic_url: image,
            uploaderIsVisible: false
        });
    }
    showUploader(){
        this.setState({
            uploaderIsVisible: true
        });
    }
    setBio(bio){
        this.setState({
            bio: bio,
        });
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <div className="header">
                            <div className="logo_container">
                                <img className="logo" src="/logo-s.png" />
                            </div>
                            <h1>Welcome, {this.state.first}!</h1>
                            <div className="small_profilepic">
                                <ProfilePic url={this.state.profilepic_url}
                                    showUploader={this.showUploader} />
                            </div>
                        </div>
                        <div>
                            <Route
                                exact
                                path="/"
                                render = {() => (
                                    <Profile
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        url={this.state.profilepic_url}
                                        image={this.state.image}
                                        onClick={this.showUploader}
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                        showUploader={this.showUploader}
                                    />

                                )}
                            />
                            <Route
                                path="/friends"
                                component={Friends}
                            />
                            <Route
                                path="/user/:id"
                                render={props => (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route
                                path="/online"
                                render={() => (
                                    <Onlines />
                                )}
                            />
                            <Route
                                path="/chat"
                                render={() => (
                                    <Chat />
                                )}
                            />
                        </div>
                        {this.state.uploaderIsVisible &&
                            <Uploader  onClick={this.showUploader}
                                setImage={this.setImage} />}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
