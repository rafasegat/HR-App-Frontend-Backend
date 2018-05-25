import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import { Button, Modal } from 'react-bootstrap';
import HeaderMain from '../../components/Header/HeaderMain';
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
        this.onClickLogout = this.onClickLogout.bind(this);
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

    onClickLogout() {
        setInStorage('feedback360', "");
        this.props.history.push('/');
    }

    redirectProjects(id_project){
        setInStorage('feedback360_project', {
                project: id_project
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
        values['id_organization'] = getFromStorage('feedback360_organization').organization;
        ProjectAction.save(values);
    }

    render() {
        const {
            isLoading,
            listProjects,
            showModal
        } = this.state;
        
        return (
            <section className="Projects">
                <HeaderMain onClickLogout={this.onClickLogout} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            { isLoading ? <Loading /> : 
                                <ProjectList 
                                    list={listProjects}
                                    openModal={this.openModal} 
                                    redirectProjects={this.redirectProjects}/>
                            }
                        </div> 
                    </div>
                </div>
                <Modal show={showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProjectForm onSubmit={this.handleSubmit}/>
                    </Modal.Body>
                </Modal>
            </section>
        );
    }
}

export default Project;