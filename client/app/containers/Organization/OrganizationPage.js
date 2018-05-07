import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'

import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../utils/storage';
import { isLogged } from '../../utils/tools';
import HeaderMain from '../../components/Header/HeaderMain';

class Organization extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            token: getFromStorage('feedback360').token,
            listOrganizations: {}
        };
        console.log(this.state);
        this.onClickLogout = this.onClickLogout.bind(this);

    }

    componentDidMount(){
        // fetch('aoi/organization/all', {
        //     method: 'GET',
        //     headers: { 'Content-Type' : 'application/json' },
        //     body: JSON.stringify({ 
        //         user: user,
        //     }),
        // }).then(res => res.json())
        //   .then(json => {
        //       cosole.log(json);
        // });
    }

    onClickLogout() {
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
            token
        } = this.state;

        if(isLoading)
            return (<div><p>Loading...</p></div>);
        
        if(token){
            return (
                <div>
                    <HeaderMain 
                        onClickLogout={this.onClickLogout} />
                    <div>Organizations list</div>
                </div>
            );
        } else {
            return ( <Redirect to="/"/> );
        }
        
    }
}

export default Organization;