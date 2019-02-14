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
        axios.post('/login', {
            email: this.email,
            pass: this.pass
        }).then((respond) => {
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
            <div className="registration_fields">
                <h2>Log in</h2>
                <input className="registration_inputs" name='email' placeholder="E-mail address" onChange={this.handleChange}/>
                <input className="registration_inputs" name='pass' type="password" placeholder="Pass word" onChange={this.handleChange}/>
                <button className="registration_button" onClick={this.submit}>Log in</button>
                <Link to="/">Click here to Register!</Link>
            </div>
        );
    }
}
