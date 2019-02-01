import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';



export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e){
        this[e.target.name] = e.target.value;
    }
    submit(){
        console.log("submiting");
        axios.post('/register', {
            first: this.first,
            last: this.last,
            email: this.email,
            pass: this.pass
        }).then(({data}) => {
            console.log("i got a respond", {data});
            if (data.success){
                location.replace('/');
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }
    render() {
        return (
            <div className="registration_fields">
                <input name='first' placeholder="First name" onChange={this.handleChange} />
                <input name='last' placeholder="Last name" onChange={this.handleChange}/>
                <input name='email' placeholder="E-mail address" onChange={this.handleChange}/>
                <input name='pass' type="password" placeholder="Pass word" onChange={this.handleChange}/>
                <button onClick={this.submit}>Register</button>
                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}

// {this.state.error && <div className="error">Ooops!</div>}
