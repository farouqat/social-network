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
        axios.post('/register', {
            first: this.first,
            last: this.last,
            email: this.email,
            pass: this.pass,
            profilepic_url: 'https://s3.amazonaws.com/spicedling/TlorU-1JCemXV7-MmulwJzw_SqorVHcD.png'
        }).then(({data}) => {
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
                <h2>Register now</h2>
                <input className="registration_inputs" name='first' placeholder="First name" onChange={this.handleChange} />
                <input className="registration_inputs" name='last' placeholder="Last name" onChange={this.handleChange}/>
                <input className="registration_inputs" name='email' placeholder="E-mail address" onChange={this.handleChange}/>
                <input className="registration_inputs" name='pass' type="password" placeholder="Pass word" onChange={this.handleChange}/>
                <button className="registration_button" onClick={this.submit}>Register</button>
                <Link className="link" to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}
// {this.state.error && <div className="error">Ooops! Error </div>}
