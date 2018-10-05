import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Containers
import App from './containers/App';
import LoginPage from './containers/Login/LoginPage';
import PrivateRoute from './utils/Auth';
import OrganizationPage from './containers/Organization/OrganizationPage';
import ParticipantPage from './containers/Participant/ParticipantPage';
import ProviderCustomerPage from './containers/ProviderCustomer/ProviderCustomerPage';
import ProviderCustomerOrganizationPage from './containers/ProviderCustomerOrganization/ProviderCustomerOrganizationPage';
import ProjectPage from './containers/Project/ProjectPage';
import NotFoundPage from './containers/NotFoundPage';

// Styles
import './styles/styles.scss';

// Flux
import Dispatcher from './flux/Dispatcher';
import UserStore from './flux/user/UserStore';
import OrganizationStore from './flux/organization/OrganizationStore';
import ProjectStore from './flux/project/ProjectStore';
import ParticipantStore from './flux/participant/ParticipantStore';
import ProviderStore from './flux/provider/ProviderStore';
import ProviderCustomerStore from './flux/provider-customer/ProviderCustomerStore';
import ProviderCustomerOrganizationStore from './flux/provider-customer-organization/ProviderCustomerOrganizationStore';

// Registrando o dispatcher e stores
Dispatcher().registerStore('UserStore', UserStore);
Dispatcher().registerStore('OrganizationStore', OrganizationStore);
Dispatcher().registerStore('ProjectStore', ProjectStore);
Dispatcher().registerStore('ParticipantStore', ParticipantStore);
Dispatcher().registerStore('ProviderStore', ProviderStore);
Dispatcher().registerStore('ProviderCustomerStore', ProviderCustomerStore);
Dispatcher().registerStore('ProviderCustomerOrganizationStore', ProviderCustomerOrganizationStore);

render((
  <Router>
      <App browser={Router}>
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <PrivateRoute path="/organizations" component={OrganizationPage}/>
          <PrivateRoute path="/projects/:organization_id" component={ProjectPage}/>
          <PrivateRoute path="/participants" component={ParticipantPage}/>
          <PrivateRoute path="/provider-customers" component={ProviderCustomerPage}/>
          <PrivateRoute path="/provider-customers-organization" component={ProviderCustomerOrganizationPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </App>
  </Router>
), document.getElementById('app'));
