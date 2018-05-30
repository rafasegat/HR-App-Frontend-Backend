import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
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
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
        
        if(isLoading)
            return (<Loading />);

        return (
            <section className="organizations">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <OrganizationList 
                                list={listOrganizations}
                                openModal={this.openModal} 
                            />
                        </div> 
                    </div>
                </div>
                {/* <Modal isOpen={showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new organization</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <OrganizationForm onSubmit={this.handleSubmit}/>
                    </Modal.Body>
                </Modal> */}

                 <Modal isOpen={showModal} toggle={this.closeModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeModal}>New Organization</ModalHeader>
                    <ModalBody>
                        <OrganizationForm onSubmit={this.handleSubmit}/>
                    </ModalBody>
                </Modal>
                    
            </section>
        );
    }
}

export default Organization;