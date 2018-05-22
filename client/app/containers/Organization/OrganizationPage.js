import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import { Button, Modal } from 'react-bootstrap';
import HeaderMain from '../../components/Header/HeaderMain';
import Loading from '../../components/Common/Loading';
import OrganizationList from './OrganizationList';
import OrganizationForm from '../../components/Organization/Form';
import OrganizationAction from '../../flux/organization/OrganizationAction';
import * as Action from '../../flux/organization/OrganizationAction';

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

        let currentInstance = this;
        OrganizationAction.addListener((type, payload)=>currentInstance.onOrganizationStoreChanged(type, payload, currentInstance));

    }

    onOrganizationStoreChanged(type, payload, currentInstance){
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                listOrganizations: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                OrganizationAction.all();
                currentInstance.closeModal();
            }
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        });
        OrganizationAction.all();
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
        OrganizationAction.save(values);
    }

    render() {
        const {
            isLoading,
            listOrganizations,
            showModal
        } = this.state;
        console.log()
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