import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import 'whatwg-fetch';
import HeaderMain from '../../components/Header/HeaderMain';
import Loading from '../../components/Common/Loading';
import OrganizationList from './OrganizationList';
import OrganizationForm from '../../components/Organization/Form';
import OrganizationAction, { LIST_ALL_ORGS, SAVE_ORG } from '../../actions/OrganizationAction';

/**
 * @info
 * Legal que vc esta dando um extends aqui. Pensa que seus componentes dentro de components tbm
 * podem ser classes. Se vc fizer deles uma classe, vc ganha orientacao a objetos de brinde.
 * Mas nao e nada requerido tbm nao.
 */
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectProjects = this.redirectProjects.bind(this);


        /**
         * @info#5
         * adicionando essa view ao listener da OrganizationStore
         */
        let currentInstance = this;
        OrganizationAction.addListener((type, payload)=>currentInstance.onOrganizationStoreChanged(type, payload, currentInstance));

    }

    /**
     * @info#7
     * Esse metodo esta ouvindo sua store OrganizationStore. Quando seu ajax retornar seu
     * json.data la na sua store, vc invoca os listeners dela e passa o retorno no payload param.
     * Dessa forma, se outra view desejar ouvir esse evento, basta se registrar pra ouvir a store.
     * @param {*} type 
     * @param {*} payload 
     * @param {*} currentInstance 
     */
    onOrganizationStoreChanged(type, payload, currentInstance){
        if(type==="all"){
            currentInstance.setState({
                isLoading: false,
                listOrganizations: payload.data
            });
        }

        if(type==="save"){
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

        /**
         * 
         * @info 1
         * aqui eu aconselho vc a seguir algum pattern.
         * Sempre que voce for executar uma acao que acessa dados,
         * e interessante seguir um pattern pois vc pode manter seu codigo
         * bem facil de manter depois. Eu estou usando Flux, mas eu implementei
         * ele na unha pra aprender mesmo. Segui so as diretrizes.
         * Se vc usar flux, aqui, vc chamaria uma action pra fazer esse fetch.
         * A action chamaria um dispacher que iria dispachar seu evento para todas as
         * stores do seu sistema. As stores ao executar uma mudanca de estado invocam 
         * listeners. Ai vc precisa attachar o OrganizartionPage a um listener e no listener
         * vc receberia o retorno desse fetch.
         * Escrevendo parece complicadissimo mas nao e cara. O que vc fez ate aqui e muito mais dificil de aprender
         * do que isso.
         */

        //veja que so chama a action aqui, sem esperar call back nem nada.
        //@info#9
        OrganizationAction.listAll();
    }

    onClickLogout() {
        setInStorage('feedback360', "");
        this.props.history.push('/');
    }

    redirectProjects(id_organization){
        setInStorage('feedback360_organization', {
                organization: id_organization
        });
        this.props.history.push('/projects');
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }


    /**
     * 
     * @info
     * Aqui tbm vc pode seguir um pattern. 
     * 
     */
    handleSubmit(values){
        this.setState({
            isLoading: true
        });
        
        values['id_user'] = getFromStorage('feedback360').user;

        OrganizationAction.save(values);
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
                                <OrganizationList 
                                    list={listOrganizations}
                                    openModal={this.openModal} 
                                    redirectProjects={this.redirectProjects}/>
                            }
                        </div> 
                    </div>
                </div>
                <Modal show={showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new organization</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <OrganizationForm onSubmit={this.handleSubmit}/>
                    </Modal.Body>
                </Modal>
            </section>
        );
    }
}

export default Organization;