import React from 'react';
import './Registration.css';

class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            registerName:'',
            registerEmail:'',
            registerPassword:''
        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onSubmit = () => {
        if(this.state.registerName.length === 0 || this.state.registerPassword.length < 5){
            return alert('Invalid Registration');
        }
        if(!this.state.registerEmail.includes('@') || !this.state.registerEmail.includes('.com')){
            return alert('Wrong Registration');
        }
        fetch('http://localhost:3001/register', {
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                name:this.state.registerName,
                email:this.state.registerEmail,
                password:this.state.registerPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                this.props.onloadUser(user);
                this.props.onRouteChange('home')
            }
        })
    }

    render(){
        return(
            <div className='font'>
                <main className="pa4 black-80 center">
                    <div className="measure shadow-5 pa5 color">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Registration</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-blue w-100 text-color" 
                            type="text" 
                            name="name"  
                            id="name" 
                            onChange = {this.onNameChange}
                            />  
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-blue w-100 text-color" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange = {this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-blue w-100 text-color" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange = {this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmit} 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in" />
                        </div>
                    </div>
                </main>
            </div>
        );
    }
    
}

export default Registration;