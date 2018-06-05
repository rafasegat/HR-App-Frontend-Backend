import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import Loading from '../../components/Common/Loading';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import ParticipantForm from '../../components/Participant/Form';
import ParticipantList from './ParticipantList';
import ParticipantAction from '../../flux/participant/ParticipantAction';
import * as Action from '../../flux/participant/ParticipantAction';

class Participant extends Component {
    constructor(props, match){
        super(props);
        this.state = {
            isLoading: false,
            listParticipants: [],
            showModal: false,
            id_project: null
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // ID organization from param
        let href = this.props.location.pathname;
        let hrefWithId = href.match(/([^\/]*)\/*$/)[1];
        this.state.id_organization = hrefWithId;

        let currentInstance = this;
        ParticipantAction.addListener((type, payload)=>currentInstance.onParticipantStoreChanged(type, payload, currentInstance));

    }

    onParticipantStoreChanged(type, payload, currentInstance){
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                listParticipants: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                ParticipantAction.all(id_organization);
                currentInstance.closeModal();
            }
        }
    }

    componentDidMount(){
        let id_project = getFromStorage('FB360_Project').id_project;
        // If there's no organization, let's go back
        if(!id_project)
            this.props.history.push('/organizations');
        
        this.setState({ isLoading: true });

        ParticipantAction.all(id_project);
    }

    openModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    handleSubmit(values){
        const {
            id_organization
        } = this.state;

        this.setState({ isLoading: true });

        values['id_organization'] = id_organization;
        values['id_project_status'] = 1; // Collecting Feedback
        ParticipantAction.save(values);
    }

    render() {
        const {
            isLoading,
            listParticipants,
            showModal
        } = this.state;
        
        if(isLoading)
            return (<Loading />);

        return (
            <section className="participants">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Collect feedback</h2>
                            <ParticipantList 
                                list={listParticipants}
                                openModal={this.openModal}
                            />
                        </div> 
                    </div>
                </div>
                <Modal isOpen={showModal} toggle={this.closeModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeModal}>New Organization</ModalHeader>
                    <ModalBody>
                        <ParticipantForm onSubmit={this.handleSubmit}/>
                    </ModalBody>
                </Modal>
            </section>
        );
    }
}

export default Participant;