import React from 'react';
import FieldText  from '@atlaskit/field-text';
import Btn  from '@atlaskit/button';
import Form, { Field } from '@atlaskit/form';


const SignIn = props => {
    const {
        modelCurrent
    } = props;
    return (
        <div className="signin" >
            <p>Sign In</p>
            <Field>
                <FieldText
                    name="feeback360-email"
                    value={modelCurrent.email}
                    onChange={(e) => props.updateModel({field: 'email', value: e.target.value}) } 
                    placeholder="Email"
                    onKeyPress={props.onKeyPress}
                />
            </Field>
            <Field>
                <FieldText  name="feeback360-password" 
                    type="password" 
                    value={modelCurrent.password}
                    placeholder="Password" 
                    onChange={(e) => props.updateModel({field: 'password', value: e.target.value}) } 
                    onKeyPress={props.onKeyPress}
                />
            </Field>
            <br/>
            <Btn isLoading={props.isLoading} 
                 appearance='primary'
                 onClick={props.handleSignIn}>
                Login
            </Btn>
            <div className='messageErrors'>{props.messageValidation}</div>
        </div>
    );
}

export default SignIn;