import React from "react";
import axios from "./axios";
import FriendButton from './friendbutton';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        axios.get(`/user/${this.props.match.params.id}.json`).then((results)=>{
            if (results.data.redirectTo){
                this.props.history.push(results.data.redirectTo);
            }
            this.setState({
                first: results.data[0].first,
                last: results.data[0].last,
                id: results.data[0].id,
                profilepic_url: results.data[0].profilepic_url,
                bio: results.data[0].bio
            });
        });
    }
    render() {
        return (
            <div className="other_profile_comp">
                <img className="other_profile_profilepic" src={this.state.profilepic_url} />
                <h4>{this.state.first} {this.state.last} {this.state.bio}
                </h4>
                <FriendButton
                    otherUserId = { this.props.match.params.id }
                />
            </div>
        );
    }
}
