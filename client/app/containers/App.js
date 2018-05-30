import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router';
import { getFromStorage, setInStorage } from '../utils/Storage';
import PropTypes from 'prop-types';
import Sidebar from '../components/Common/Sidebar'; 
import Footer from '../components/Common/Footer';
import HeaderMain from '../components/Common/Header/HeaderMain';
import HeaderLogin from '../components/Common/Header/HeaderLogin';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      headerType: this.getHeader(this.props.location.pathname),
      showSidebar: false
    };
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  componentDidMount(){
    this.checkSidebar();
  }

  componentDidUpdate(){
    const { headerType } = this.state;
    const { pathname } = this.props.location;
    const currentHeader = this.getHeader(pathname);
  
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

  checkSidebar(){
    const { pathname } = this.props.location;
    if(pathname.indexOf('organizations') > 0 || 
       pathname.indexOf('projects') > 0 ||
       pathname==='/'){
        this.setState({ showSidebar: false });
    } else {
      this.setState({ showSidebar: true });
    }
  }

  onClickLogout() {
    setInStorage('feedback360', "");
    this.props.history.push('/');
  }

  render() {
    const { 
      headerType,
      showSidebar
    } = this.state;
    const { children } = this.props;
    return (
      <>
        {  headerType=='login' ? <HeaderLogin/> : 
            <HeaderMain onClickLogout={this.onClickLogout}/> 
        }
        <main>
          { showSidebar && <Sidebar /> }
          {children}
        </main>
        <Footer />
      </>
    );
  }

}

export default withRouter(App);