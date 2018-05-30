import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class ModalContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
        showModal: true
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { 
      title
    } = this.props;

    const {
      showModal 
    } = this.state;
    
    return (
      <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {this.props.children}
          </Modal.Body>
      </Modal>
    );
  }

}

export default ModalContainer;