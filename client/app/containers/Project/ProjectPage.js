import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import Loading from '../../components/Common/Loading';
import ProjectForm from '../../components/Project/Form';
import ProjectList from './ProjectList';
import ProjectAction from '../../flux/project/ProjectAction';
import * as Action from '../../flux/project/ProjectAction';

class Project extends Component {
    constructor(props, match){
        super(props);
        this.state = {
            isLoading: false,
            isLogged: true,
            listProjects: [],
            showModal: false,
            id_organization: null
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // ID organization from param
        let href = this.props.location.pathname;
        let hrefWithId = href.match(/([^\/]*)\/*$/)[1];
        this.state.id_organization = hrefWithId;

        let currentInstance = this;
        ProjectAction.addListener((type, payload)=>currentInstance.onProjectStoreChanged(type, payload, currentInstance));

    }

    onProjectStoreChanged(type, payload, currentInstance){
        const {
            id_organization
        } = this.state;
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                listProjects: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                ProjectAction.all(id_organization);
                currentInstance.closeModal();
            }
        }
    }

    componentDidMount(){
        const {
            id_organization
        } = this.state;

        // If there's no organization, let's go back
        if(!id_organization)
            this.props.history.push('/organizations');
        
        this.setState({
            isLoading: true
        });

        ProjectAction.all(id_organization);
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    handleSubmit(values){
        const {
            id_organization
        } = this.state;

        this.setState({
            isLoading: true
        });

        values['id_organization'] = id_organization;
        values['id_project_status'] = 1; // Collecting Feedback
        ProjectAction.save(values);
    }

    render() {
        const {
            isLoading,
            listProjects,
            showModal
        } = this.state;
        
        if(isLoading)
            return (<Loading />);

        return (
            <section className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ProjectList 
                                list={listProjects}
                                openModal={this.openModal}    
                            />
                        </div> 
                    </div>
                </div>
                <Modal isOpen={showModal} toggle={this.closeModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeModal}>New Organization</ModalHeader>
                    <ModalBody>
                        <ProjectForm onSubmit={this.handleSubmit}/>
                    </ModalBody>
                </Modal>
            </section>
        );
    }
}

export default Project;