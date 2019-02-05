import React from "React";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            buttonText: 'Send Friend Request'
        };
        this.updateFriendship = this.updateFriendship.bind(this);
    }
    componentDidMount(){
        axios.get('/get-initial-status/'+ this.props.otherUserId).then((resp) => {
            if (!resp.data.rows[0]) {
                console.log("no resp");
                this.setState({
                    buttonText: 'Send Friend Request'
                });
            } else if (resp.data.rows[0].accepted == true){
                console.log("it's accepted");
                this.setState({
                    buttonText: 'Unfriend'
                });
            } else if (resp.data.rows[0].sender_id == this.props.otherUserId
                && resp.data.rows[0].accepted == false){
                this.setState({
                    buttonText: 'Accept Friend Request'
                });
            } else {
                console.log("not accepted");
                this.setState({
                    buttonText: 'Cancel Friend Request'
                });
            }
        });
    }

    updateFriendship(){
        if (this.state.buttonText == 'Send Friend Request'){
            console.log("request sent");
            axios.post('/make-friend-request/'+ this.props.otherUserId);
            this.setState({
                buttonText: 'Cancel Friend Request'
            });
        } else if (this.state.buttonText == 'Cancel Friend Request'){
            console.log("request canceled");
            axios.post('/delete-friend-request/'+ this.props.otherUserId);
            this.setState({
                buttonText: 'Send Friend Request'
            });
        } else if (this.state.buttonText == 'Accept Friend Request'){
            axios.post('/accept-friend-request/'+ this.props.otherUserId);
            this.setState({
                buttonText: 'Unfriend'
            });
        } else if (this.state.buttonText == 'Unfriend'){
            axios.post('/delete-friend-request/'+ this.props.otherUserId);
            this.setState({
                buttonText: 'Send Friend Request'
            });
        }

    }
    render(){
        return(
            <button onClick={this.updateFriendship}> { this.state.buttonText } </button>
        );
    }

}
