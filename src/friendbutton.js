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
        const self = this;
        axios.get('/get-initial-status/'+ self.props.otherUserId).then((resp) => {
            if (!resp.data.rows[0]) {
                console.log("no resp");
                self.setState({
                    buttonText: 'Send Friend request'
                });
            } else if (resp.data.rows[0].accepted == true){
                console.log("it's accepted");
                self.setState({
                    buttonText: 'Unfriend'
                });
            } else {
                console.log("not accepted");
                self.setState({
                    buttonText: 'Cancel Friend Request'
                });
            }
        });
    }
    updateFriendship(){
        const self = this;
        if (self.state.buttonText == 'Send Friend request'){
            axios.get('/make-friend-request/'+ self.props.otherUserId);
            self.setState({
                buttonText: 'Cancel Friend Request'
            });
        } else if (self.state.buttonText == 'Cancel Friend Request'){
            axios.post('/delete-friend-request/'+ self.props.otherUserId);
            self.setState({
                buttonText: 'Cancel Friend Request'
            });
        } else {
            console.log("blabla");
        }

        axios.get('/make-friend-request/'+ self.props.otherUserId).then((resp) => {
            var accepted = resp.data.rows[0].accepted;
            console.log("accepted", accepted);
            if (accepted) {
                self.setState= {
                    buttonText: 'Unfriend'
                };
            } else {
                self.setState= {
                    buttonText: 'Cancel Friend request'
                };
            }
        });
        // here is where all the post routes are going to do
        // what does buttonText say? Do something different based off of what buttonText says!
        // if button says "Make friend request" when it was clicked, then we need to INSERT into friendships table
        // this.setState({
        //     buttonText: 'Delete Friend Request'
        // });
    }
    render(){
        return(
            <button onClick={this.updateFriendship}> { this.state.buttonText } </button>
        );
    }

}
