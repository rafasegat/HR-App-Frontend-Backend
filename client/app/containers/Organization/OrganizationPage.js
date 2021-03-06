import React, { Component } from 'react';
import { getFromStorage } from '../../utils/Storage';
import { refreshModel } from '../../utils/Tools';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Loading from '../../components/Common/Loading';
import OrganizationList from './OrganizationList';
import OrganizationForm from '../../components/Organization/OrganizationForm';
import OrganizationAction from '../../flux/organization/OrganizationAction';
import * as Action from '../../flux/organization/OrganizationAction';
import { organization_status_info } from '../../flux/organization/OrganizationAction';

class Organization extends Component {
    constructor(props){
        super(props);

        let user = getFromStorage('FB360_Token').user,
            model = {
                id: -1,
                name: '',
                id_user: user,
                status: organization_status_info.in_progress.key
            };

        this.state = {
            isLoading: false,
            isLoadingPage: true,
            isLogged: true,
            listOrganizations: [],
            showModal: false,
            modelCurrent: model,
            modelCurrentDefault: model,
            messageValidation: '',
            submitDisabled: true
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.redirectToProjects = this.redirectToProjects.bind(this)
        this.updateModel = this.updateModel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        let currentInstance = this;
        OrganizationAction.addListener((type, payload)=>currentInstance.onOrganizationStoreChanged(type, payload, currentInstance));
    }

    onOrganizationStoreChanged(type, payload, currentInstance){
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                isLoadingPage: false,
                listOrganizations: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                OrganizationAction.all();
                currentInstance.closeModal();
            }
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        });
        OrganizationAction.all();
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
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
        console.log(modelCurrent)
        this.validateForm();
    }

    validateForm(){
        const { 
            modelCurrent 
        } = this.state;

        let message = '';

        if(!modelCurrent.name) message += 'Name cannot be blank.';
        
        if(message) this.setState({ submitDisabled: true  });
        else this.setState({ submitDisabled: false  });
        this.setState({ messageValidation: message  });   
    }

    redirectToProjects(id){
        let url = '/projects/' + id;
        this.props.history.push(url);
    }

    handleEdit(id){
        const {
            listOrganizations,
            modelCurrent
        } = this.state;
        refreshModel(this);
        const currentRow = listOrganizations.filter((el) => {
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
        refreshModel(this);
        this.openModal();
    }

    handleSubmit(){
        const { 
            modelCurrent,
            submitDisabled
        } = this.state;

        this.setState({
            isLoading: true
        });

        if(!submitDisabled)
            OrganizationAction.save(modelCurrent);
    }

    render() {
        const {
            isLoading,
            isLoadingPage,
            listOrganizations,
            showModal,
            modelCurrent,
            messageValidation,
            submitDisabled
        } = this.state;

        if(isLoadingPage)
            return(<Loading />);

        return (
            <section className="organizations">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <OrganizationList 
                                list={listOrganizations}
                                handleEdit={this.handleEdit}
                                handleNew={this.handleNew} 
                                redirectToProjects={this.redirectToProjects}
                                isLoading={isLoading}
                            />
                        </div> 
                    </div>
                </div>

                 <Modal isOpen={showModal} toggle={this.closeModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeModal}>Organization</ModalHeader>
                    <ModalBody>
                        <OrganizationForm 
                            modelCurrent={modelCurrent}
                            updateModel={this.updateModel}
                            handleSubmit={this.handleSubmit}
                            messageValidation={messageValidation}
                            submitDisabled={submitDisabled}
                            isLoading={isLoading}
                        />
                    </ModalBody>
                </Modal>

            </section>
        );
    }
}

export default Organization;