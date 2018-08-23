import React, { Component } from 'react';
import {validateEmail} from '../../utils/Tools'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { status as statusParticipant } from '../../flux/participant/ParticipantAction';

import ParticipantAction from '../../flux/participant/ParticipantAction';
import ProviderAction from '../../flux/provider/ProviderAction';

import AddProviderForm from '../../components/Provider/AddProviderForm';

import * as ActionParticipant from '../../flux/participant/ParticipantAction';
import * as ActionProvider from '../../flux/provider/ProviderAction';
import ProviderList from '../Provider/ProviderList';

class FeedbackForm extends Component {

    constructor(props, match){
        super(props);

        let id_participant = props.currentParticipant.id,
            id_project = getFromStorage('FB360_Project').id;

        this.state = {
            listProviders: [],
            currentParticipant: props.currentParticipant,
            id_participant: id_participant,
            id_project: id_project,
            activeTab: '1',
            messageValidation: '',
            submitDisabled: true,
            modelProvider: { 
                             name: '',
                             relationship: 1, // Default: Self assessment
                             id_project: id_project,
                             id_participant: id_participant
                           },
            participantProviderOptions: []

        };

        this.toggle = this.toggle.bind(this);
        this.updateDataProvider = this.updateDataProvider.bind(this);
        this.handleSubmitAddProvider = this.handleSubmitAddProvider.bind(this);

        let currentInstance = this;
        ParticipantAction.addListener((type, payload)=>currentInstance.onParticipantStoreChanged(type, payload, currentInstance));
        ProviderAction.addListener((type, payload)=>currentInstance.onProviderStoreChanged(type, payload, currentInstance));
    }

    componentDidMount(){
        const { 
                id_project,
                id_participant 
              } = this.state;

        // If there's no organization, let's go back
        if(!id_project)
            this.props.history.push('/organizations');

        this.setState({ isLoading: true });

        ParticipantAction.providers({
            id_participant: id_participant,
            id_project: id_project
        });

        ParticipantAction.all({ 
            id_project: id_project 
        });
        
        ParticipantAction.allLessCurrent({ 
            id_project: id_project,
            id_participant: id_participant
        });
    }

    toggle(tab) {
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
                isLoading: false,
                listProviders: payload.data
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
        const { id_project } = this.state;

        if(type===ActionProvider.SAVE){
            currentInstance.setState({
                isLoading: false,
                //listProviders: payload.data
            });
        }
    }

    validateForm(){
        const { 
            modelProvider 
        } = this.state;

        let message = '';

        if( modelProvider.relationship != 1 ){

            if(!modelProvider.name)
            message += 'Name cannot be blank.\n';

        }

        if(!modelProvider.relationship)
            message += 'Select Relationship.\n';
        
        if(message)
            this.setState({ submitDisabled: true  });
        else
            this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  });
        
    }

    updateDataProvider(data){
        const { modelProvider } = this.state;
        let aux = modelProvider;
        aux[data.field] = data.value;
        this.setState({
            modelProvider: aux
        });
        console.log(modelProvider)
        this.validateForm();
    }

    handleSubmitAddProvider(){
       const {
        modelProvider,
       } = this.state;
       console.log(modelProvider)
       ProviderAction.save(modelProvider);
    }

    render(){

        const {
            listProviders,
            currentParticipant,
            showAddProvider,
            modelProvider,
            messageValidation,
            submitDisabled,
            participantProviderOptions
        } = this.state;
        
        let status = statusParticipant.find(x => x.id_status === currentParticipant.status);
        
        return(
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink className="active" onClick={() => { this.toggle('1'); }} >
                            Feedback Providers
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => { this.toggle('2'); }} >
                            Tasks
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => { this.toggle('3'); }} >
                            Profile Settings
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                
                                <h4>List of Feedback Providers</h4>
                                <h5>Status: {status!=undefined && status.name}</h5>
                                <ProviderList 
                                    listProviders={listProviders}
                                    currentParticipant={currentParticipant}
                                />
                                
                                <AddProviderForm  
                                    modelProvider={modelProvider} 
                                    updateDataProvider={this.updateDataProvider}
                                    handleSubmitAddProvider={this.handleSubmitAddProvider}
                                    submitDisabled={submitDisabled}
                                    messageValidation={messageValidation}
                                    participantProviderOptions={participantProviderOptions}
                                />

                            </Col> 
                        </Row>
                    </TabPane>
                    
                    <TabPane tabId="2">
                        <Row>
                        <Col sm="12">

                            <h4>Tab 2 Contents</h4>

                        </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="3">
                        <Row>
                        <Col sm="12">

                            <h4>Tab 3 Contents</h4>

                        </Col>
                        </Row>
                    </TabPane>

                </TabContent>
            </div>
        )

    }
}

export default FeedbackForm;