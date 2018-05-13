import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/storage';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import 'whatwg-fetch';
import HeaderMain from '../../components/Header/HeaderMain';
import Loading from '../../components/Common/Loading';
import OrganizationForm from '../../components/Organization/Form';

class Organization extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            isLogged: true,
            listOrganizations: [],
            showModal: false
        };
        this.onClickLogout = this.onClickLogout.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        this.setState({
            isLoading: true
        });
        fetch('/api/organization/allByUser', {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': getFromStorage('feedback360').token
                     },
            body: JSON.stringify({ 
                user: getFromStorage('feedback360').user
            }),
        }).then(res => res.json())
          .then(json => {
            console.log(json)
            if(!json.success){
                //this.props.history.push('/');
            }
            console.log(json);
            this.setState({
                isLoading: false
            });

        }).catch(err => {
            console.log(err);
        });
    }

    onClickLogout() {
        setInStorage('feedback360', "");
        this.props.history.push('/');
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    handleSubmit(values){
        this.setState({
            isLoading: true
        });
        
        values['id_user'] = getFromStorage('feedback360').user;

        fetch('/api/organization/save', {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': getFromStorage('feedback360').token
                     },
            body: JSON.stringify({
                data: values
            }),
        }).then(res => res.json())
          .then(json => {
            
            console.log(json);

            this.setState({
                isLoading: false
            });

        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const {
            isLoading,
            listOrganizations,
            showModal
        } = this.state;

        return (
            <section className="organizations">
                <HeaderMain onClickLogout={this.onClickLogout} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            { isLoading ? <Loading /> : 
                        
                                listOrganizations.length == 0 ? 

                                <div>
                                    <p>No organizations. Create your first!</p>
                                    <button onClick={this.openModal}>Create new organization</button>
                                </div>   

                                :

                                <p>Orgs</p>
                            
                            }
                        </div> 
                    </div>
                </div>
                <Modal show={showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new organization</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <OrganizationForm onSubmit={this.handleSubmit}/>
                    </Modal.Body>
                </Modal>
            </section>
        );
    }
}

export default Organization;