import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import { Button, Modal } from 'react-bootstrap';
import HeaderMain from '../../components/Header/HeaderMain';
import Loading from '../../components/Common/Loading';
import ProjectForm from '../../components/Project/Form';
import ProjectList from './ProjectList';
import ProjectAction from '../../flux/project/ProjectAction';

class Project extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            isLogged: true,
            listProjects: [],
            showModal: false
        };
        this.onClickLogout = this.onClickLogout.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        let currentInstance = this;
        console.log('dsdssd');
        ProjectAction.addListener((type, payload)=>currentInstance.onProjectStoreChanged(type, payload, currentInstance));

    }

    onProjectStoreChanged(type, payload, currentInstance){
        if(type==="all"){
            currentInstance.setState({
                isLoading: false,
                listProjects: payload.data
            });
        }
        if(type==="save"){
            if(payload.status==='success'){
                ProjectAction.all();
                currentInstance.closeModal();
            }
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        });
        ProjectAction.all();
    }

    onClickLogout() {
        setInStorage('feedback360', "");
        this.props.history.push('/');
    }

    redirectProjects(id_Project){
        setInStorage('feedback360_Project', {
                Project: id_Project
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
        values['id_user'] = getFromStorage('feedback360').user;
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