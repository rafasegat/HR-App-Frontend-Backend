import React, { Component } from 'react';
import { getFromStorage } from '../../utils/Storage';
import Loading from '../../components/Common/Loading';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import ProviderCustomerForm from '../../components/ProviderCustomer/ProviderCustomerForm';
import ProviderCustomerList from './ProviderCustomerList';
import ProviderCustomerAction from '../../flux/provider-customer/ProviderCustomerAction';
import * as Action from '../../flux/provider-customer/ProviderCustomerAction';
import { validateEmail } from '../../utils/Tools'

class ProviderCustomer extends Component {

    constructor(props, match){
        super(props);

        let id_project = getFromStorage('FB360_Project').id,
            id_organization = getFromStorage('FB360_Organization').id;

        this.state = {
            isLoading: false,
            listProviderCustomer: [],
            showModal: false,
            id_project: id_project,
            id_organization: id_organization,
            modelCurrent: {
                name: '',
                email: '',
                id_organization: id_organization
            },
            messageValidation: '',
            submitDisabled: true
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        let currentInstance = this;
        ProviderCustomerAction.addListener((type, payload)=>currentInstance.onProviderCustomerStoreChanged(type, payload, currentInstance));
    }

    onProviderCustomerStoreChanged(type, payload, currentInstance){
        const { id_organization } = this.state;
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                listProviderCustomer: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                ProviderCustomerAction.all({ id_organization: id_organization });
                currentInstance.closeModal();
            }
        }
    }

    componentDidMount(){
        const { 
            id_project,
            id_organization 
        } = this.state;

        // If there's no organization, let's go back
        if(!id_project)
            this.props.history.push('/organizations');

        if(!id_organization)
            this.props.history.push('/organizations');
        
        this.setState({ isLoading: true });
        ProviderCustomerAction.all({ id_organization: id_organization });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
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
            message += 'Name cannot be blank.\n';

        if(!modelCurrent.email)
            message += 'Email cannot be blank.\n';

        if(!validateEmail(modelCurrent.email))
            message += 'Email not valid.\n';
        
        if(message)
            this.setState({ submitDisabled: true  });
        else
            this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  });
        
    }

    handleSubmit(){
        const { 
            modelCurrent 
        } = this.state;
        this.setState({ isLoading: true });
        ProviderCustomerAction.save(modelCurrent);
    }

    render(){
        const { 
            isLoading,
            listProviderCustomer,
            showModal,
            modelCurrent,
            messageValidation,
            submitDisabled
        } = this.state;

        if(isLoading)
            return (<Loading />);

        return(
            <section className="provider-customer">

                <div className="provider-customer-list">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>Provider - External Customers</h2>
                                <ProviderCustomerList 
                                    list={listProviderCustomer}
                                    openModal={this.openModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={showModal} toggle={this.closeModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeModal}>Customer</ModalHeader>
                    <ModalBody>
                        <ProviderCustomerForm
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

export default ProviderCustomer;