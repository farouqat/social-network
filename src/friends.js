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
                <div> Friends
                    {this.props.friends && this.props.friends.map(
                        f => {
                            return (
                                <div key = {f.id} >
                                    { f.first }
                                    { f.last }
                                    <img src={f.profilepic_url} />
                                    <button onClick={() => this.props.dispatch(unfriend(f.id))}>Unfriend</button>
                                </div>
                            );
                        }
                    )}
                </div>
                <div> Friends requests
                    {this.props.pending && this.props.pending.map(
                        w => {
                            return (
                                <div key = {w.id} >
                                    { w.first }
                                    { w.last }
                                    <img src={w.profilepic_url} />
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
    console.log("state at friends component",state);
    return {
        friends: state.list && state.list.filter(list => list.accepted === true),
        pending: state.list && state.list.filter(list => list.accepted === false)
    };
};

export default connect(mapStateToProps)(Friends);
