import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../utils/storage';
import HeaderLogin from '../components/Header/HeaderLogin';
import SignIn from '../components/Login/SignIn/SignIn';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };

    // This binding is necessary to make `this` work in the callback
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);

  } 

  // If you need to load data from a remote endpoint, 
  //this is a good place to instantiate the network request.
  componentDidMount(){
    const obj = getFromStorage('feedback360');
    if(obj && obj.token){
      const { token } = obj;
      // Verify token
      fetch('api/account/verify?token='+token)
        .then(res => res.json())
        .then(json => {
          // If token okay, the user is logged, so redirect to organizations page
          if(json.success) {
            this.redirectOrganizations();
          } else {
            this.setState({
              isLoading: false
            });
          }
      });
    } else {
        this.setState({
          isLoading: false
        });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          // set our token on storage
          setInStorage('feedback360', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  redirectOrganizations(){
    this.props.history.push('/organizations');
  }

  render() {

    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;
    
    if(isLoading)
      return (<div><p>Loading...</p></div>);

    if(!token){
      return (
        <div className="login-page">
          <HeaderLogin />
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <SignIn 
                  email={signInEmail} 
                  password={signInPassword} 
                  onTextboxChangeSignInEmail={this.onTextboxChangeSignInEmail}
                  onTextboxChangeSignInPassword={this.onTextboxChangeSignInPassword}
                  onSignIn={this.onSignIn}
                  error={signInError}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    this.redirectOrganizations();
    return(null);
    
  }
}

export default Login;