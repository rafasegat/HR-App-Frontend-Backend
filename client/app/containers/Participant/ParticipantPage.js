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
            showFeedbackModal: false,
            id_project: getFromStorage('FB360_Project').id_project
        };
        
        // Events
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.openFeedbackModal = this.openFeedbackModal.bind(this);
        this.closeFeedbackModal = this.closeFeedbackModal.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        let currentInstance = this;
        ParticipantAction.addListener((type, payload)=>currentInstance.onParticipantStoreChanged(type, payload, currentInstance));

    }

    onParticipantStoreChanged(type, payload, currentInstance){
        const { id_project } = this.state;
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                listParticipants: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                ParticipantAction.all(id_project);
                currentInstance.closeModal();
            }
        }
    }

    componentDidMount(){
        const { id_project } = this.state;

        // If there's no organization, let's go back
        if(!id_project)
            this.props.history.push('/organizations');
        
        this.setState({ isLoading: true });
        ParticipantAction.all(id_project);
    }

    openModal() {
        this.setState({ showModal: true });
    }

    openFeedbackModal(id){
        console.log(id)
        this.setState({ showFeedbackModal: true });
    }

    closeFeedbackModal(){
        this.setState({ showFeedbackModal: false });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    handleSubmit(values){
        // this.setState({ isLoading: true });

        values['status'] = Action.status.waiting_for_feedback.id;

        // Let's handle the cheboxes
        if(!values['self_assessment'])
            values['self_assessment'] = false;
        
        if(!values['choose_own_feedback_provider'])
            values['choose_own_feedback_provider'] = false;
        
        if(!values['feedback_provider_needs_approval'])
            values['feedback_provider_needs_approval'] = false;
        
        // values['id_project_status'] = 1; // Collecting Feedback
        ParticipantAction.save(values);
        console.log(values);
    }

    render() {
        const {
            isLoading,
            listParticipants,
            showModal,
            showFeedbackModal
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
                                openFeedbackModal={this.openFeedbackModal}
                            />
                        </div> 
                    </div>
                </div>
                <Modal isOpen={showModal} toggle={this.closeModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeModal}>New Participant</ModalHeader>
                    <ModalBody>
                        <ParticipantForm onSubmit={this.handleSubmit}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={showFeedbackModal} toggle={this.closeFeedbackModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeFeedbackModal}>Feedback Manager</ModalHeader>
                    <ModalBody>
                        <ParticipantForm onSubmit={this.handleSubmit}/>
                    </ModalBody>
                </Modal>

            </section>
        );
    }
}

export default Participant;