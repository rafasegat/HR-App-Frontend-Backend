import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/storage';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import 'whatwg-fetch';
import HeaderMain from '../../components/Header/HeaderMain';
import Loading from '../../components/Common/Loading';
import OrganizationList from './OrganizationList';
import OrganizationForm from '../../components/Organization/Form';
//commit test
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
        this.redirectProjects = this.redirectProjects.bind(this);
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
            if(!json.success){
                this.setState({
                    isLoading: false,
                    listOrganizations: []
                });
            } else{
                this.setState({
                    isLoading: false,
                    listOrganizations: json.data
                });
            }
            
        }).catch(err => {
            this.props.history.push('/');
        });
    }

    onClickLogout() {
        setInStorage('feedback360', "");
        this.props.history.push('/');
    }

    redirectProjects(id_organization){
        setInStorage('feedback360_organization', {
                organization: id_organization
        });
        this.props.history.push('/projects');
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
                                <OrganizationList 
                                    list={listOrganizations}
                                    openModal={this.openModal} 
                                    redirectProjects={this.redirectProjects}/>
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