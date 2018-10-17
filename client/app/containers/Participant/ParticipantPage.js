import React, { Component } from 'react';
import { getFromStorage } from '../../utils/Storage';
import Loading from '../../components/Common/Loading';
import { validateEmail } from '../../utils/Tools'
import { Modal, ModalHeader, ModalBody  } from 'reactstrap';
import ParticipantForm from '../../components/Participant/ParticipantForm';
import ParticipantList from './ParticipantList';
import ParticipantAction from '../../flux/participant/ParticipantAction';
import ParticipantFeedbackModal from './ParticipantFeedbackModal';
import ProviderCustomerAction from '../../flux/provider-customer/ProviderCustomerAction';
import * as ActionProviderCustomer from '../../flux/provider-customer/ProviderCustomerAction';
import * as Action from '../../flux/participant/ParticipantAction';


class Participant extends Component { 
    constructor(props, match){
        super(props);

        let id_project = getFromStorage('FB360_Project').id,
            id_organization = getFromStorage('FB360_Organization').id,
            model = {
                id: -1,
                name: '',
                email: '',
                position: '',
                self_assessment: true,
                choose_own_feedback_provider: true,
                feedback_provider_needs_approval: false,
                id_participant_feedback_reviewer: null
            };

        this.state = {
            isLoading: false,
            isLoadingPage: true,
            listParticipants: [],
            listProviderCustomers: [],
            showParticipantModal: false,
            showFeedbackModal: false,
            id_project: id_project,
            id_organization: id_organization,
            currentParticipant: [],
            reportReviewerOptions: [],
            modelParticipant: model,
            modelParticipantDefault: model,
            messageValidation: '',
            submitDisabled: true,
            showTooltip: -1
        };
        
        this.openParticipantModal = this.openParticipantModal.bind(this);
        this.closeParticipantModal = this.closeParticipantModal.bind(this);
        this.updateModelParticipant = this.updateModelParticipant.bind(this);
        this.openFeedbackModal = this.openFeedbackModal.bind(this);
        this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
        this.handleSubmitParticipant = this.handleSubmitParticipant.bind(this);
        this.handleNewParticipant = this.handleNewParticipant.bind(this);
        this.handleEditParticipant = this.handleEditParticipant.bind(this);
        this.handleDeleteParticipant = this.handleDeleteParticipant.bind(this);
        this.handleTooltip = this.handleTooltip.bind(this);

        let currentInstance = this;
        ParticipantAction.addListener((type, payload)=>currentInstance.onParticipantStoreChanged(type, payload, currentInstance));
        ProviderCustomerAction.addListener((type, payload)=>currentInstance.onProviderCustomerStoreChanged(type, payload, currentInstance));
    }

    onParticipantStoreChanged(type, payload, currentInstance){
        const { id_project } = this.state;
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                isLoadingPage: false,
                listParticipants: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                ParticipantAction.all({ id_project: id_project });
                currentInstance.closeParticipantModal();
            }
        }
        if(type===Action.DELETE){
            if(payload.status==='success'){
                currentInstance.setState({
                    isLoading: true,
                    showTooltip: -1 
                });
                ParticipantAction.all({ id_project: id_project });
                currentInstance.closeParticipantModal();
            }
        }
    }


    onProviderCustomerStoreChanged(type, payload, currentInstance){
        if(type===ActionProviderCustomer.ALL){
            currentInstance.setState({
                isLoading: false,
                listProviderCustomers: payload.data
            });
        }
    }

    componentDidMount(){
        const { id_project, id_organization } = this.state;

        // If there's no organization, let's go back
        if(!id_project)
            this.props.history.push('/organizations');


        this.setState({ isLoading: true });

        //Customers
        ProviderCustomerAction.all({ 
            id_organization: id_organization 
        });
        
        // Participants
        ParticipantAction.all({ id_project: id_project });
    }

    refreshModel(){
        const {
            modelParticipant,
            modelParticipantDefault
        } = this.state;
        let aux = {};
        for(var prop in modelParticipantDefault)
            aux[prop] = modelParticipantDefault[prop];

        this.setState({ 
            modelParticipant: aux 
        });
    }

    openParticipantModal() {
        this.setState({ showParticipantModal: true });
    }

    closeParticipantModal() {
        this.setState({ showParticipantModal: false });
    }

    handleTooltip(id){
        this.setState({ showTooltip: id });
    }

    openFeedbackModal(currentParticipant){
        this.setState({ 
            currentParticipant: currentParticipant,
            showFeedbackModal: true 
        });
    }

    closeFeedbackModal(){
        this.setState({ showFeedbackModal: false });
    }

    updateModelParticipant(data){
        const { 
            modelParticipant 
        } = this.state;
        let aux = modelParticipant;
        aux[data.field] = data.value;
        this.setState({
            modelParticipant: aux
        });
        console.log(modelParticipant)
        this.validateForm();
    }

    validateForm(){
        const { 
            modelParticipant 
        } = this.state;
        let message = '';

        if(!modelParticipant.name) message += 'Name cannot be blank.\n';
        if(!modelParticipant.email) message += 'Email cannot be blank.\n';
        if(!validateEmail(modelParticipant.email)) message += 'Email not valid.\n';
        
        if(message) this.setState({ submitDisabled: true  });
        else this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  });
    }

    handleSubmitParticipant(){
        const { 
            modelParticipant 
        } = this.state;
        this.setState({ isLoading: true });
        modelParticipant['status'] = 1; // waiting_for_feedback
        ParticipantAction.save(modelParticipant);
    }

    handleNewParticipant(){
        this.refreshModel();
        this.openParticipantModal();
    }

    handleEditParticipant(id){
        const {
            listParticipants,
            modelParticipant
        } = this.state;
        const currentRow = listParticipants.filter((el) => {
            return el.id == id;
        });
        let aux = {};
        for(var prop in currentRow[0]){
            if(modelParticipant.hasOwnProperty(prop)){
                aux[prop] = currentRow[0][prop];
            }
        }
        this.setState({ 
            modelParticipant: aux 
        });
        this.openParticipantModal();
    }

    handleDeleteParticipant(id){
        const { id_project } = this.state;
        
        this.setState({
            showTooltip: false,
            isLoading: true
        });

        ParticipantAction.delete({ 
            id_project: id_project,
            id_participant: id
        });
    }

    render() {
        const {
            isLoading,
            isLoadingPage,
            listParticipants,
            listProviderCustomers,
            showParticipantModal,
            showFeedbackModal,
            currentParticipant,
            modelParticipant,
            messageValidation,
            submitDisabled,
            showTooltip
        } = this.state;

        if(isLoadingPage)
            return (<Loading />);

        return (
            <section className="participants">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Collect Feedback</h2>
                            <ParticipantList 
                                list={listParticipants}
                                handleNewParticipant={this.handleNewParticipant}
                                handleEditParticipant={this.handleEditParticipant}
                                handleDeleteParticipant={this.handleDeleteParticipant}
                                handleTooltip={this.handleTooltip}
                                showTooltip={showTooltip}
                                openFeedbackModal={this.openFeedbackModal}
                                isLoading={isLoading}
                            />
                        </div> 
                    </div>
                </div>
                <Modal isOpen={showParticipantModal} toggle={this.closeParticipantModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeParticipantModal}>Participant</ModalHeader>
                    <ModalBody>
                        <ParticipantForm
                            modelParticipant={modelParticipant}
                            updateModelParticipant={this.updateModelParticipant}
                            handleSubmitParticipant={this.handleSubmitParticipant}
                            listParticipants={listParticipants}
                            messageValidation={messageValidation}
                            submitDisabled={submitDisabled}
                        />
                    </ModalBody>
                </Modal>
                <Modal isOpen={showFeedbackModal} toggle={this.closeFeedbackModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeFeedbackModal}>Feedback Manager</ModalHeader>
                    <ModalBody>
                        <ParticipantFeedbackModal
                            currentParticipant={currentParticipant} 
                            handleFeedbackSubmit={this.handleFeedbackSubmit}
                            listProviderCustomers={listProviderCustomers}
                            listParticipants={listParticipants}
                        />
                    </ModalBody>
                </Modal>
            </section>
        );
    }
}

export default Participant;