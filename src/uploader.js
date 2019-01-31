import React from "React";
import axios from "./axios";



export default class Uploader extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }
    submit(e){
        e.preventDefault();
        let self = this;
        var file = document.getElementById('profilepic');
        var uploadedFile = file.files[0];
        var formData = new FormData();
        formData.append('file', uploadedFile);
        console.log(formData);
        axios.post('/upload', formData).then(function(response) {
            console.log("this is the response", response);
            console.log("this is the url", response.data.profilepic_url);
            self.props.setImage(response.data.profilepic_url);

        })
            .catch(function(err) {
                console.log(err);
            });
    }
    render(){
        return (
            <div>
                <h1>Uploader</h1>
                <input type="file" id="profilepic"/>
                <button onClick={this.submit}>Upload </button>
            </div>
        );
    }




}
