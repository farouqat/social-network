import React from 'react';
import { connect } from 'react-redux';
import {initSocket} from './socket';
import { send } from './actions';

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            textOfMessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            textOfMessage: e.target.value
        });
    }
    reset() {
        initSocket().emit('userSentMessage', this.state.textOfMessage);
        this.setState({
            textOfMessage: ''
        });
    }
    render(){
        return(
            <div>
                <textarea
                    value={this.state.textOfMessage} onChange={this.handleChange}>
                </textarea>
                <button
                    onClick={() => {
                        initSocket().emit('chatMessage', this.message);
                        this.reset();}
                    }
                >
                    send
                </button>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    if (!state.sentmessage) {
        return {};
    } else {
        return {
            sentmessage: state.sentmessage
        };
    }
};

export default connect(mapStateToProps)(Chat);
