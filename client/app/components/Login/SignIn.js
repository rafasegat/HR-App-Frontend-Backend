import React from 'react';
import FieldText  from '@atlaskit/field-text';

const SignIn = props => {
    return (
        <div className="signin" >

            <p>Sign In</p>
            
            <FieldText
                name="feeback360-username"
                onChange={props.onTextboxChangeSignInEmail}
                label="Email"
                onKeyPress={props.onKeyPress}
            />

            <FieldText  name="feeback360-password" 
                type="password" 
                label="Password" 
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