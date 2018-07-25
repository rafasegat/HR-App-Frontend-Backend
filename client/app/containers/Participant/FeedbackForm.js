import React, { Component } from 'react';
import { Field, reduxForm, Control } from 'redux-form';
import {validateEmail} from '../../utils/Tools'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { status as statusParticipant } from '../../flux/participant/ParticipantAction';
import ParticipantAction from '../../flux/participant/ParticipantAction';
import * as Action from '../../flux/participant/ParticipantAction';
import ProviderList from '../Provider/ProviderList';

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    }
    if( !validateEmail(values.email) ){
        errors.email = 'Email not valid.'
    }
    return errors;
}

class FeedbackForm extends Component {

    constructor(props, match){
        super(props);
        this.state = {
            listProviders: [],
            currentParticipant: props.currentParticipant,
            id_participant: props.currentParticipant.id,
            id_project: getFromStorage('FB360_Project').id_project,
            activeTab: '1'
        };

        this.toggle = this.toggle.bind(this);
        
        let currentInstance = this;
        ParticipantAction.addListener((type, payload)=>currentInstance.onParticipantStoreChanged(type, payload, currentInstance));
    }

    onParticipantStoreChanged(type, payload, currentInstance){
        
        const { id_project } = this.state;
        
        if(type===Action.PROVIDERS){
            console.log(payload.data)
            currentInstance.setState({
                isLoading: false,
                listProviders: payload.data
            });
        }
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
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render(){
        const {
            listProviders,
            currentParticipant
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

export default reduxForm({
    form: 'feedback',
    validate
})(FeedbackForm);