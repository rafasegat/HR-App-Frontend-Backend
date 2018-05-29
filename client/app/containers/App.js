import React, { Component, PropTypes } from 'react';
import Footer from '../components/Footer/Footer';
import { getFromStorage, setInStorage } from '../utils/Storage';
import HeaderMain from '../components/Header/HeaderMain';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {};

    const propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    }

    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout() {

      const { 
          match, 
          location, 
          history 
      } = this.props

      setInStorage('feedback360', "");
      console.log(this.props);
      history.push('/');
  }

  render() {

    const {
    } = this.state;
    
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

export default App;