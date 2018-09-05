import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route,  Link, Switch } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form'

// Containers
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import PrivateRoute from './utils/Auth';
import OrganizationPage from './containers/Organization/OrganizationPage';
import ParticipantPage from './containers/Participant/ParticipantPage';
import ProjectPage from './containers/Project/ProjectPage';
import NotFoundPage from './containers/NotFoundPage';

// Styles
import './styles/styles.scss';

// Flux
import Dispatcher from './flux/Dispatcher';
import OrganizationStore from './flux/organization/OrganizationStore';
import ProjectStore from './flux/project/ProjectStore';
import ParticipantStore from './flux/participant/ParticipantStore';
import ProviderStore from './flux/provider/ProviderStore';

// Registrando o dispatcher e stores
Dispatcher().registerStore('OrganizationStore', OrganizationStore);
Dispatcher().registerStore('ProjectStore', ProjectStore);
Dispatcher().registerStore('ParticipantStore', ParticipantStore);
Dispatcher().registerStore('ProviderStore', ProviderStore);


// Handle our Redux Form stuffs
const rootReducer = combineReducers({
  form: formReducer
});

const store = createStore(rootReducer);

render((
  <Router>
    {/* <Provider store={store}> */}
      <App browser={Router}>
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <PrivateRoute path="/organizations" component={OrganizationPage}/>
          <PrivateRoute path="/projects/:organization_id" component={ProjectPage}/>
          <PrivateRoute path="/participants" component={ParticipantPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </App>
    {/* </Provider> */}
  </Router>
), document.getElementById('app'));
