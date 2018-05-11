import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/storage';
import HeaderMain from '../../components/Header/HeaderMain';
import Loading from '../../components/Common/Loading';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import 'whatwg-fetch';

class Organization extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            isLogged: true,
            listOrganizations: [],
            showModal: false
        };
        this.onClickLogout = this.onClickLogout.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount(){
        this.setState({
            isLoading: true
        });
        fetch('api/organization/allByUser', {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': getFromStorage('feedback360').token
                     },
            body: JSON.stringify({ 
                user: 1
            }),
        }).then(res => res.json())
          .then(json => {
            
            this.setState({
                isLoading: false
            });
            
            console.log(json);
        
        });
    }

    onClickLogout() {
        setInStorage('feedback360', "");
        this.props.history.push('/');
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    render() {
        const {
            isLoading,
            listOrganizations,
            showModal
        } = this.state;

        return (
            <section className="organizations">
                <HeaderMain onClickLogout={this.onClickLogout} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            { isLoading ? <Loading /> : 
                        
                                listOrganizations.length == 0 ? 

                                <div>
                                    <p>No organizations. Create your first!</p> 
                                    
                                    <Button
                                        bsStyle="primary"
                                        bsSize="large"
                                        onClick={this.openModal}
                                        >
                                        Create new organization
                                    </Button>
                                </div>   

                                    :

                                    <p>Orgs</p>
                            
                            }
                        </div> 
                    </div>
                </div>
                <Modal show={showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new organization</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.save}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </section>
        );
    }
}

export default Organization;