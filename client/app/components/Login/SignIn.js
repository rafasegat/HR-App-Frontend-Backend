import React from 'react';
import FieldText  from '@atlaskit/field-text';
import Btn  from '@atlaskit/button';

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
                onKeyPress={props.onKeyPress}
            />
            <Btn isLoading={props.isLoading} 
                 appearance='primary'
                 onClick={props.onSignIn}>
                Login
            </Btn>
            
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