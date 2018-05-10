import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/storage';
import HeaderMain from '../../components/Header/HeaderMain';
import 'whatwg-fetch';

class Organization extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            isLogged: true,
            listOrganizations: {}
        };
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    componentDidMount(){
        fetch('api/organization/allByUser', {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': getFromStorage('feedback360').token
                     },
            body: JSON.stringify({ 
                user: 1
            }),
        }).then(res => res.json())
          .then(json => {
              console.log(json);
        });
    }

    onClickLogout() {
        setInStorage('feedback360', "");
        this.setState({
            isLogged: false
        });
    }

    render() {
        const {
            isLoading,
            isLogged
        } = this.state;

        if(isLoading)
            return (<div><p>Loading...</p></div>);
        
        if(!isLogged)
            this.props.history.push('/');

        return (
            <div>
                <HeaderMain 
                    onClickLogout={this.onClickLogout} />
                <div>Organizations list</div>
            </div>
        );
    }
}

export default Organization;