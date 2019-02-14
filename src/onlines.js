import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


class Onlines extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        if (!this.props.onlines){
            return null;
        }
        return (

            <div>
                <h1>Online users: </h1>
                {this.props.onlines && this.props.onlines.map(
                    i => {
                        return (
                            <div className="online_friend"  key={i.id}>
                                {<Link to={`/user/${i.id}`}>
                                    <img src={i.profilepic_url} />
                                    <h2>{i.first} {i.last}</h2>
                                </Link>}
                            </div>
                        );
                    }
                )}
            </div>
        );
    }
}
const mapStateToProps = function(state) {
    return {
        onlines: state.onlineUsers
    };

};

export default connect(mapStateToProps)(Onlines);
