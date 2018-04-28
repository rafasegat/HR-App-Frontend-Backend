import React from 'react';
import './SignIn.scss'

const SignIn = props => {

    return (
        <div className="signin">
            <p>Sign In</p>
            <input 
                type="email" 
                placeholder="Email" 
                value={props.email} 
                onChange={props.onTextboxChangeSignInEmail} />
            <br/>
            <input 
                type="password" 
                placeholder="Password" 
                value={props.password} 
                onChange={props.onTextboxChangeSignInPassword}/>
            <br />
            <button 
                onClick={props.onSignIn}>
                Sign In
            </button>
            <br />
            {
            (props.error) ? (
                <p>{props.error}</p>
            ) : (null)
            }
        </div>
    );
}

export default SignIn;