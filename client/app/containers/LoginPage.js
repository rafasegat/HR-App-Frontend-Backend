import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage
} from '../utils/storage';

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
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);

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
          if(json.success) {
            this.setState({
              token,
              isLoading: false
            });
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

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp(){
    // Grab state
    const {
      signUpEmail,
      signUpPassword
    } = this.state;

    this.setState({
      isLoading: true,
    });

    fetch('/api/account/signup', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ 
        email: signUpEmail,
        password: signUpPassword
       }),
    }).then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
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

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('feedback360');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
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
              
              {/* <div>
                <p>Sign Up</p>
                <input type="email" placeholder="Email"  value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} /><br />
                <input type="password" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword} />
                <br />
                <button onClick={this.onSignUp}>Sign Up</button>
                {
                  (signUpError) ? (
                    <p>{signUpError}</p>
                  ) : (null)
                }
              </div> */}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Redirect to="/organizations"/>
    );
    
  }
}

export default Login;
