import React, { Component } from 'react';
import { getFromStorage } from '../../utils/Storage';
import Loading from '../../components/Common/Loading';

class SurveyDesignPage extends Component {
    constructor(props, match){
        super(props);

        let id_project = getFromStorage('FB360_Project').id,
            id_organization = getFromStorage('FB360_Organization').id,
            model = {
                id: -1,
                name: '',
                id_organization: id_organization
            };

        this.state = {
            isLoading: false, 
            listSurvey: [],
            showModal: false,
            id_project: id_project,
            id_organization: id_organization,
            modelCurrent: model,
            modelCurrentDefault: model,
            messageValidation: '',
            submitDisabled: true,
            showTooltip: -1
        };
        
        let currentInstance = this;
        //SurveyAction.addListener((type, payload)=>currentInstance.onSurveyStoreChanged(type, payload, currentInstance));
    }

    componentDidMount(){
        const { 
            id_project,
            id_organization,
            modelCurrent
        } = this.state;

        // If there's no organization, let's go back
        if(!id_project)
            this.props.history.push('/organizations');

        if(!id_organization)
            this.props.history.push('/organizations');
        
        //this.setState({ isLoading: true });
        //SurveyAction.all({ id_organization: id_organization });
    }

    refreshModel(){
        const {
            modelCurrent,
            modelCurrentDefault
        } = this.state;
        let aux = {};
        for(var prop in modelCurrentDefault)
            aux[prop] = modelCurrentDefault[prop];

        this.setState({ 
            modelCurrent: aux 
        });
    }

    validateForm(){
        const { 
            modelCurrent
        } = this.state;
        let message = '';

        if(!modelCurrent.name) message += 'Name cannot be blank.\n';
        
        if(message) this.setState({ submitDisabled: true  });
        else this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  }); 
    }


    render(){
        const { 
            isLoading
        } = this.state;

        if(isLoading)
            return (<Loading />);

        return(
            <section className="survey-design">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Design</h2>
                            
                            ndfjnvdfk,dfl

                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default SurveyDesignPage;