import React, { Component } from 'react';
import { Field, reduxForm, Control } from 'redux-form';
import {validateEmail} from '../../utils/Tools'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { status as statusParticipant } from '../../flux/participant/ParticipantAction';
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
            currentParticipant: props.currentParticipant,
            activeTab: '1'
        };
        this.toggle = this.toggle.bind(this);
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