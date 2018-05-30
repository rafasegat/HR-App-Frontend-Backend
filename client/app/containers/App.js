import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Footer from '../components/Footer/Footer';
import { getFromStorage, setInStorage } from '../utils/Storage';
import HeaderMain from '../components/Header/HeaderMain';
import HeaderLogin from '../components/Header/HeaderLogin';



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      headerType: this.getHeader(this.props.location.pathname)
    };
    this.onClickLogout = this.onClickLogout.bind(this);

    
    // Login
    
  }

  componentDidUpdate(){
    const { headerType } = this.state;
    const currentHeader = this.getHeader(this.props.location.pathname);
  
    // Just update state if is a different value
    if(headerType != currentHeader){
      this.setState({
        headerType: currentHeader
      });
    }
  }

  getHeader(pathname){
    if(pathname==='/')
      return 'login';
    else
      return 'general';
  }

  onClickLogout() {
    setInStorage('feedback360', "");
    this.props.history.push('/');
  }

  render() {
    const { headerType } = this.state;
    const { children } = this.props;
    return (
      <>
        {
          headerType=='login' ? 
            <HeaderLogin/>
          :
            <HeaderMain onClickLogout={this.onClickLogout}/>
        }
        <main>
          {children}
        </main>
        <Footer />
      </>
    );
  }

}

export default withRouter(App);