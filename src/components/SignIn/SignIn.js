import React from 'react';
import './SignIn.css';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onSigninEmail = (event) => {
        this.setState({signInEmail:event.target.value})
    }

    onSigninPassword = (event) => {
        this.setState({signInPassword:event.target.value})
    }

    onSubmitChange = () => {
        fetch('http://localhost:3001/signin' , {
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:this.state.signInEmail,
                password:this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id){
                this.props.onloadUser(data);
                this.props.onRouteChange('home');
            }
        })
    }

    render(){
        const{onRouteChange} = this.props;
        return(
            <div className="font">
                <main className="pa4 black-80 center">
                    <div className="measure shadow-5 pa5 color">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-blue w-100 text-color" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange = {this.onSigninEmail}
                        />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-blue w-100 text-color" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange = {this.onSigninPassword}
                        />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmitChange} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <div onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }  
}

export default SignIn;