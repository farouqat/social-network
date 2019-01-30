import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e){
        this[e.target.name] = e.target.value;
    }
    submit(){
        console.log("submiting");
        axios.post('/login', {
            email: this.email,
            pass: this.pass
        }).then((respond) => {
            console.log("i got a respond");
            console.log(respond);
            if (respond.data.success){
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
            <div>
                <input name='email' placeholder="E-mail address" onChange={this.handleChange}/>
                <input name='pass' type="password" placeholder="Pass word" onChange={this.handleChange}/>
                <button onClick={this.submit}>Log in</button>
                <Link to="/register">Click here to Register!</Link>

            </div>
        );
    }
}
