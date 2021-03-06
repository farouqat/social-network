import React from 'react';
import { connect } from 'react-redux';
import { receiveFriendsWannabes , acceptFriendRequest, unfriend } from './actions';



class Friends extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(receiveFriendsWannabes());
    }
    render() {
        if (!this.props.friends && !this.props.pending ){
            return null;
        }
        return (
            <div>
                <h2 className="friends_lable"> Your friends </h2>
                <div className="friends_comp">
                    {this.props.friends && this.props.friends.map(
                        f => {
                            return (
                                <div className="friend" key = {f.id} >
                                    <img src={f.profilepic_url} />
                                    <div>
                                        <h5> { f.first } { f.last } </h5>
                                        <button onClick={() => this.props.dispatch(unfriend(f.id))}>Unfriend</button>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
                <h2 className="friends_lable"> Friends requests</h2>
                <div className="friends_comp">
                    {this.props.pending && this.props.pending.map(
                        w => {
                            return (

                                <div className="friend" key = {w.id} >
                                    <img src={w.profilepic_url} />
                                    <h5> { w.first } { w.last } </h5>
                                    <button onClick={() => this.props.dispatch(acceptFriendRequest(w.id))}>Accept friend request</button>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("this is the state in the friends comp", state);
    return {
        friends: state.list && state.list.filter(list => list.accepted === true),
        pending: state.list && state.list.filter(list => list.accepted === false)
    };
};

export default connect(mapStateToProps)(Friends);
