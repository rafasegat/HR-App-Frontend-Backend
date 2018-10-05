import React, { Component } from 'react';
import { validateEmail } from '../../utils/Tools'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import SignIn from '../../components/Login/SignIn';
import UserAction from '../../flux/user/UserAction';
import * as Action from '../../flux/user/UserAction';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      messageValidation: '-',
      modelCurrent: {
        email: '',
        password: ''
      }
    };
    
    this.updateModel = this.updateModel.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);

    let currentInstance = this;
    UserAction.addListener((type, payload)=>currentInstance.onUserStoreChanged(type, payload, currentInstance));

  } 

  componentDidMount(){
    const token = getFromStorage('FB360_Token');
    UserAction.verify_token({ token: token });
  }

  onUserStoreChanged(type, payload, currentInstance){
    const { id_organization } = this.state;
    
    if(type===Action.VERIFY_TOKEN){
      
      if(payload.data.success){
        this.redirectOrganizations();
      } else{
        currentInstance.setState({
          isLoading: false
        });
      }
    }
    
    if(type===Action.SIGNIN){
      if (payload.status=='success') {
        if (payload.data.success) {
          setInStorage('FB360_Token', { 
            token: payload.data.token,
            user: payload.data.user
          });
          this.setState({
            token: payload.data.token
          });
          this.redirectOrganizations();
        } else {
          this.setState({
            messageValidation: payload.data.message,
            isLoading: false
          });
        }
      } else {
        this.setState({
          messageValidation: 'Unexpected error. Try again.',
          isLoading: false
        });
      }
    }
    
  }

  validateForm(){
    const { 
        modelCurrent
    } = this.state;
    let message = '';

    if(!modelCurrent.email) message += 'Email cannot be blank.\n';
    if(!validateEmail(modelCurrent.email)) message += 'Email not valid.\n';
    if(!modelCurrent.password) message += 'Password cannot be blank.\n';

    if(message) this.setState({ submitDisabled: true  });
    else this.setState({ submitDisabled: false  });
    
    this.setState({ messageValidation: message  }); 

  }

  updateModel(data){
    const { 
        modelCurrent 
    } = this.state;
    let aux = modelCurrent;
    aux[data.field] = data.value;
    this.setState({
        modelCurrent: aux
    });
    this.validateForm();
  }

  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.handleSignIn();
    }
  }

  handleSignIn() {
    const { 
      modelCurrent,
      messageValidation
    } = this.state;

    this.validateForm();

    if(messageValidation==''){
      this.setState({
        isLoading: true
      });
      UserAction.signin(modelCurrent);
    }
  }

  redirectOrganizations(){
    this.props.history.push('/organizations');
  }

  render() {
    const {
      modelCurrent,
      isLoading,
      token,
      messageValidation
    } = this.state;

    if(!token){
      return (
        <section className="login-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <SignIn 
                  isLoading={isLoading}
                  handleSignIn={this.handleSignIn}
                  messageValidation={messageValidation}
                  updateModel={this.updateModel}
                  onKeyPress={this.handleKeyPress}
                  modelCurrent={modelCurrent}
                />
              </div>
            </div>
          </div>
        </section>
      );
    }
    this.redirectOrganizations();
    return(null);
    
  }
}

export default Login;