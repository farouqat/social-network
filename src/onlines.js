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
        console.log("this props", this.props);
        return (
            <div className="">
                <div className="">
                    <h1>Online users: </h1>
                    {this.props.onlines && this.props.onlines.map(
                        i => {
                            return (
                                <div key={i.id}>
                                    {<Link to={`/user/${i.id}`}>
                                        <div className="">
                                            <img src={i.url || 'https://s3.amazonaws.com/spicedling/TlorU-1JCemXV7-MmulwJzw_SqorVHcD.png'} />
                                        </div>
                                        <div className="user_info">
                                            <h2>{i.first} {i.last}</h2>
                                        </div>
                                    </Link>}
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
    console.log("this is the state in online", state);
    return {
        onlines: state.onlineUsers
    };

};


export default connect(mapStateToProps)(Onlines);
