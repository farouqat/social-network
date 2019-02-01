import React from "react";
import axios from './axios';
import ProfilePic from "./profilepic.js";
import Uploader from "./uploader";
import Profile from "./profile.js";
// import BioEditor from "./bioeditor";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            // bioEditorIsVisible: false
        };
        this.setImage = this.setImage.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    // a Lifecycle method
    componentDidMount() {
        axios.get('/user').then((results) => {
            console.log("this is the data of the user. data . rows [0]", results.data.rows[0]);
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
                <img className="logo" src="logo-s.png" />
                <h1>Welcome, {this.state.first}!</h1>
                <ProfilePic url={this.state.profilepic_url}
                    showUploader={this.showUploader} />
                <Profile
                    id={this.state.id}
                    first={this.state.first}
                    last={this.state.last}
                    image={this.state.profilepic_url}
                    onClick={this.showUploader}
                    bio={this.state.bio}
                    setBio={this.setBio}
                    // showBioEditor={this.showBioEditor}
                    showUploader={this.showUploader}
                />
                {this.state.uploaderIsVisible &&
                    <Uploader  onClick={this.showUploader}
                        setImage={this.setImage} />}
            </div>
        );
    }
}
