import React from 'react';
import { connect } from 'react-redux';
import {initSocket} from './socket';
// import { send } from './actions';

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            textOfMessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount(){
    }
    componentDidUpdate() {
        if (!this.elem) {
            return null;
        }
        this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
    }
    handleChange(e) {
        this.setState({
            textOfMessage: e.target.value
        });
    }
    submit(){
        initSocket().emit('userSentMessage', {
            message: this.state.textOfMessage,
            first: this.props.name,
            last: this.props.last,
            picture: this.props.profilepic_url
        }
        );
    }
    reset() {
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
                        this.submit();
                        this.reset();
                    }
                    }
                >
                    send
                </button>
                <div>
                    messages:
                    <ul>
                        <li>{this.props.first}{this.props.sentdata}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    if (!state.sentdata) {
        return {};
    } else {
        return {
            sentdata: state.sentdata
        };
    }
};

export default connect(mapStateToProps)(Chat);
