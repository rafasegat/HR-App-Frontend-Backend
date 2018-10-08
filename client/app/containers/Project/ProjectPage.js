import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import Loading from '../../components/Common/Loading';
import ProjectForm from '../../components/Project/ProjectForm';
import ProjectList from './ProjectList';
import ProjectAction from '../../flux/project/ProjectAction';
import * as Action from '../../flux/project/ProjectAction';
import { project_status_info } from '../../flux/project/ProjectAction';

class Project extends Component {
    constructor(props, match){
        super(props);

        let href = this.props.location.pathname,
            id_organization = href.match(/([^\/]*)\/*$/)[1],
            model = {
                id: -1,
                name: '',
                id_organization: id_organization,
                status: project_status_info.in_progress.key
            };

        this.state = {
            isLoading: false,
            isLoadingPage: true,
            listProjects: [],
            showModal: false,
            id_organization: id_organization,
            modelCurrent: model,
            modelCurrentDefault: model,
            messageValidation: '',
            submitDisabled: true
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.redirectToParticipants = this.redirectToParticipants.bind(this);


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
                isLoadingPage: false,
                listProjects: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                ProjectAction.all({ id_organization: id_organization });
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

        setInStorage('FB360_Organization', { 
            id: id_organization
        });
        
        this.setState({
            isLoading: true
        });

        ProjectAction.all({ id_organization: id_organization });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    redirectToParticipants(id_project) {
        // Let's set the global project
        setInStorage('FB360_Project', { 
            id: id_project
        });
        // redirect to participants
        this.props.history.push('/participants');
    }

    refreshModel(){
        const {
            modelCurrentDefault,
            modelCurrent
        } = this.state;
        let aux = {};
        for(var prop in modelCurrentDefault)
            aux[prop] = modelCurrentDefault[prop];

        this.setState({ 
            modelCurrent: aux 
        });
        console.log(modelCurrent)
    }

    updateModel(data){
        const { 
            modelCurrent 
        } = this.state;
        let aux = modelCurrent;
        aux[data.field] = data.value;
        this.setState({
            modelCurrent: aux
        });
        this.validateForm();
    }

    validateForm(){
        const { 
            modelCurrent 
        } = this.state;

        let message = '';

        if(!modelCurrent.name)
            message += 'Name cannot be blank.';
        
        if(message)  this.setState({ submitDisabled: true  });
        else this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  });
        
    }

    handleEdit(id){
        const {
            listProjects,
            modelCurrent
        } = this.state;
        
        const currentRow = listProjects.filter((el) => {
            return el.id == id;
        });
        let aux = {};
        for(var prop in currentRow[0]){
            if(modelCurrent.hasOwnProperty(prop)){
                aux[prop] = currentRow[0][prop];
            }
        }
        this.setState({ 
            modelCurrent: aux 
        });
        this.openModal();
    }

    handleNew(){
        this.refreshModel();
        this.openModal();
    }

    handleSubmit(){
        const {
            modelCurrent,
            id_organization,
            submitDisabled
        } = this.state;

        this.setState({
            isLoading: true
        });

        if(!submitDisabled)
            ProjectAction.save(modelCurrent);
    }

    render() {
        const {
            isLoading,
            isLoadingPage,
            listProjects,
            showModal,
            modelCurrent,
            messageValidation,
            submitDisabled
        } = this.state;

        if(isLoadingPage)
            return(<Loading />);

        return (
            <section className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ProjectList 
                                list={listProjects}
                                handleEdit={this.handleEdit}
                                handleNew={this.handleNew} 
                                redirectToParticipants={this.redirectToParticipants}
                                isLoading={isLoading}
                            />
                        </div> 
                    </div>
                </div>
                <Modal isOpen={showModal} toggle={this.closeModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeModal}>Project</ModalHeader>
                    <ModalBody>
                        <ProjectForm 
                            modelCurrent={modelCurrent}
                            updateModel={this.updateModel}
                            handleSubmit={this.handleSubmit}
                            messageValidation={messageValidation}
                            submitDisabled={submitDisabled}
                        />
                    </ModalBody>
                </Modal>
            </section>
        );
    }
}

export default Project;