import React from 'react';

const SignIn = props => {
    return (
        <div className="signin" >
            <p>Sign In</p>
            <input name="feeback360-email" type="email" placeholder="Email" 
                value={props.email} 
                onChange={props.onTextboxChangeSignInEmail}
                onKeyPress={props.onKeyPress}
                />
            <br/>
            <input  name="feeback360-password" type="password" placeholder="Password" 
                value={props.password} 
                onChange={props.onTextboxChangeSignInPassword}
                onKeyPress={props.onKeyPress}/>
            <br />
            <button className="btn-primary" onClick={props.onSignIn} >
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