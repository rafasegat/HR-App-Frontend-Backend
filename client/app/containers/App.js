import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Footer from '../components/Footer/Footer';
import { getFromStorage, setInStorage } from '../utils/Storage';
import HeaderMain from '../components/Header/HeaderMain';

class App extends Component{
  constructor(props){
    super(props);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout() {
    setInStorage('feedback360', "");
    this.props.history.push('/');
  }

  render() {
    return (
      <>
        <HeaderMain onClickLogout={this.onClickLogout}/>
        <main>
          {this.props.children}
        </main>
        <Footer />
      </>
    );
  }

}

export default withRouter(App);