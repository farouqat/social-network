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
        axios.post('/upload', formData).then(function(response) {
            self.props.setImage(response.data.profilepic_url);

        })
            .catch(function(err) {
                console.log(err);
            });
    }
    render(){
        return (
            <div className="uploader_comp">
                <input type="file" id="profilepic"/>
                <button onClick={this.submit}>Upload </button>
            </div>
        );
    }




}
