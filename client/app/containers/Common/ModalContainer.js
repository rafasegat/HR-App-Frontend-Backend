import React, { Component } from 'react';

class ModalContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      redirectLogin: false
    };

    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout() {
      setInStorage('feedback360', "");
      console.log(this);
      //history.push('/');
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