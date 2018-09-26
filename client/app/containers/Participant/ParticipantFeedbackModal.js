import React, { Component } from 'react';
import {validateEmail} from '../../utils/Tools';
import { getFromStorage } from '../../utils/Storage';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { status as statusParticipant } from '../../flux/participant/ParticipantAction';
import Loading from '../../components/Common/Loading';
import ParticipantTasksList from '../../components/Participant/ParticipantTasksList';
import ParticipantAction from '../../flux/participant/ParticipantAction';
import * as ActionParticipant from '../../flux/participant/ParticipantAction';
import ProviderAction from '../../flux/provider/ProviderAction';
import * as ActionProvider from '../../flux/provider/ProviderAction';
import ProviderCustomerAction from '../../flux/provider-customer/ProviderCustomerAction';
import * as ActionProviderCustomer from '../../flux/provider-customer/ProviderCustomerAction';
import { relationship_provider_info, status_provider_info } from '../../flux/provider/ProviderAction';
import AddProviderForm from '../../components/Provider/AddProviderForm';



import ProviderList from '../Provider/ProviderList';

class ParticipantFeedbackModal extends Component {
    constructor(props, match){
        super(props);

        let id_participant = props.currentParticipant.id,
            id_project = getFromStorage('FB360_Project').id,
            id_organization = getFromStorage('FB360_Organization').id;

        this.state = {
            listProviders: [],
            listProviderCustomers: [],
            listParticipantTasks: [],
            currentParticipant: props.currentParticipant,
            id_participant: id_participant,
            id_project: id_project,
            id_organization: id_organization,
            activeTab: '1',
            messageValidation: '',
            submitDisabled: true,
            isLoading: false,
            modelProvider: { 
                             relationship: relationship_provider_info.self_assessment.key,
                             id_project: id_project,
                             id_participant: id_participant,
                             id_provider: null,
                             id_provider_customer: null,
                             status: status_provider_info.invited.key
                           },
            participantProviderOptions: []
        };

        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.updateModelProvider = this.updateModelProvider.bind(this);
        this.handleSubmitAddProvider = this.handleSubmitAddProvider.bind(this);
        this.handleDeleteProvider = this.handleDeleteProvider.bind(this);

        let currentInstance = this;
        ParticipantAction.addListener((type, payload)=>currentInstance.onParticipantStoreChanged(type, payload, currentInstance));
        ProviderAction.addListener((type, payload)=>currentInstance.onProviderStoreChanged(type, payload, currentInstance));
        ProviderCustomerAction.addListener((type, payload)=>currentInstance.onProviderCustomerStoreChanged(type, payload, currentInstance));
    }

    componentDidMount(){
        const { 
            id_project,
            id_participant,
            id_organization
        } = this.state;

        if(!id_project)
            this.props.history.push('/organizations');

        this.setState({ isLoading: true });

        // All providers
        ParticipantAction.providers({
            id_participant: id_participant,
            id_project: id_project
        });
        // All participants
        ParticipantAction.all({ 
            id_project: id_project 
        });
        // tasks
        ParticipantAction.tasks({ 
            id_project: id_project,
            id_participant: id_participant
        });
        // All participants less the current
        ParticipantAction.allLessCurrent({ 
            id_project: id_project,
            id_participant: id_participant
        });
        //Customers
        ProviderCustomerAction.all({ 
            id_organization: id_organization 
        });
        this.updateModelProvider({
            field: 'relationship',
            value: relationship_provider_info.self_assessment.key
        });
    }

    componentWillUnmount(){
        console.log('bye bye')
        this.setState({ 
            listProviders: [],
            listProviderCustomers: []
        });
    }

    handleChangeTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onParticipantStoreChanged(type, payload, currentInstance){
        const { id_project } = this.state;

        if(type===ActionParticipant.PROVIDERS){
            currentInstance.setState({
                //isLoading: false,
                listProviders: payload.data
            });
        }
        if(type==ActionParticipant.TASKS){
            currentInstance.setState({
                isLoading: false,
                listParticipantTasks: payload.data
            });
        }
        if(type===ActionParticipant.ALL_LESS_CURRENT){
            currentInstance.setState({
                isLoading: false,
                participantProviderOptions: payload.data
            });
        }
    }

    onProviderStoreChanged(type, payload, currentInstance){
        const { 
            id_project,
            id_participant 
          } = this.state;

        if(type===ActionProvider.SAVE){
            currentInstance.setState({
                isLoading: false
            });
            // Load providers again
            ParticipantAction.providers({
                id_participant: id_participant,
                id_project: id_project
            });
        }
        if(type===ActionProvider.DELETE){
            currentInstance.setState({
                isLoading: false
            });
            ParticipantAction.providers({
                id_participant: id_participant,
                id_project: id_project
            });
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

    validateForm(){
        const { 
            modelProvider 
        } = this.state;

        let message = '';

        if( modelProvider.relationship == relationship_provider_info.self_assessment.key){
            message += 'Participant is already Self Assessing.\n';
        }

        // Relationship Manager/Peer/DirectReport
        if( modelProvider.relationship == relationship_provider_info.line_manager.key ||
            modelProvider.relationship == relationship_provider_info.peer.key ||
            modelProvider.relationship == relationship_provider_info.direct_report.key ){

            if(!modelProvider.id_provider)
                message += 'Participant Provider cannot be blank.\n';

        }

        // Relationship Customer or Supplier
        if( modelProvider.relationship == relationship_provider_info.customer.key ||
            modelProvider.relationship == relationship_provider_info.supplier.key ){

            if(!modelProvider.id_provider_customer)
                message += 'External Customer cannot be blank.\n';

        }


        if( modelProvider.relationship == relationship_provider_info.customer.key ||
            modelProvider.relationship == relationship_provider_info.supplier.key ){

                if(modelProvider.id_provider)
                    message += 'Provider must be blank.\n';

        }

        if(!modelProvider.relationship)
            message += 'Select Relationship.\n';
        
        if(message)
            this.setState({ submitDisabled: true  });
        else
            this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  });
        
    }

    updateModelProvider(data){
        const { 
            modelProvider, 
            id_participant 
        } = this.state;
        let aux = modelProvider;

        aux[data.field] = data.value;

        // Clear id_provider if change relationship
        if(  data.field =='relationship' ) {
            aux['id_provider'] = null;
        }

        // Clear id_provider if is Self aassessment / Customer / Supplier
        if(  data.field =='relationship' &&
             data.value == relationship_provider_info.self_assessment.key
         ) {
                    aux['id_provider'] = id_participant;
        }

        // Clear external if is 
        if(  data.field =='relationship' &&
           ( data.value == relationship_provider_info.self_assessment.key ||
             data.value == relationship_provider_info.line_manager.key ||
             data.value == relationship_provider_info.peer.key ||
             data.value == relationship_provider_info.direct_report.key
            )
         ) {
                aux['id_provider_customer'] = null;
        }
        this.setState({
            modelProvider: aux
        });
        this.validateForm();
    }

    handleSubmitAddProvider(){
       const {
        modelProvider,
        id_participant
       } = this.state;
       this.setState({ isLoading: true });
       ProviderAction.save(modelProvider);
    }

    handleDeleteProvider(id){
        if(!id)
            return;
        this.setState({ isLoading: true });
        ProviderAction.delete({
            id: id
        })
    }

    render(){
        const {
            listProviders,
            listProviderCustomers,
            listParticipantTasks,
            currentParticipant,
            modelProvider,
            messageValidation,
            submitDisabled,
            participantProviderOptions,
            isLoading,
            activeTab
        } = this.state;
        
        let status = statusParticipant.find(x => x.id_status === currentParticipant.status);

        if(isLoading)
            return (<Loading />);

        return(
            <div className="participant-feedback-modal">
                <div className="participant-info">
                    <h5>Participant: {currentParticipant.name} - {currentParticipant.position}</h5>
                    <h5>Status: {status!=undefined && status.name}</h5>
                </div>
                <Nav tabs>
                    <NavItem>
                        <NavLink 
                            className={activeTab=='1' && 'active'}
                            onClick={() => { this.handleChangeTab('1'); }} 
                        >
                            Feedback Providers
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink 
                            className={activeTab=='2' && 'active'}
                            onClick={() => { this.handleChangeTab('2'); }} 
                        >
                            Tasks
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <h4>List of Feedback Providers</h4>
                                <p>These participants will give feedback for {currentParticipant.name}.</p>
                                <ProviderList 
                                    listProviders={listProviders}
                                    handleDeleteProvider={this.handleDeleteProvider}
                                />
                                <AddProviderForm  
                                    modelProvider={modelProvider} 
                                    updateModelProvider={this.updateModelProvider}
                                    handleSubmitAddProvider={this.handleSubmitAddProvider}
                                    submitDisabled={submitDisabled}
                                    messageValidation={messageValidation}
                                    participantProviderOptions={participantProviderOptions}
                                    listProviderCustomers={listProviderCustomers}
                                />

                            </Col> 
                        </Row>
                    </TabPane>
                    
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">

                                <h4>List of Tasks</h4>
                                <p>That's the tasks that {currentParticipant.name} must complete.</p>
                                <ParticipantTasksList 
                                    listParticipantTasks={listParticipantTasks}
                                />

                            </Col>
                        </Row>
                    </TabPane>

                </TabContent>
            </div>
        )

    }
}

export default ParticipantFeedbackModal;