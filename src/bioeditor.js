import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state = {
            bioEditorIsVisible: false
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showBioEditor = this.showBioEditor.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit(e) {
        e.preventDefault();
        axios.post("/bio", { bio: this.bio }).then(results => {
            this.props.setBio(results.data.results.rows[0].bio);
            this.setState({ bioEditorIsVisible: false });
        });
    }
    showBioEditor(){
        this.setState({
            bioEditorIsVisible: true
        });
    }
    render() {
        return (
            <div className="bio_editer">
                <h4> {this.props.bio} </h4>
                { this.props.bio ? <button onClick={this.showBioEditor}> Edit </button> :
                    <button onClick={this.showBioEditor}> Add your bio now </button>
                }
                {this.state.bioEditorIsVisible && <div><input
                    className="bio_input"
                    name="bio"
                    placeholder="Your bio.."
                    onChange={this.handleChange}
                />
                <button onClick={this.submit}>Save</button></div>
                }
            </div>
        );
    }
}
