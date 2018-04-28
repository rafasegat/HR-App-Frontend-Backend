import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './containers/App';
import LoginPage from './containers/LoginPage';
import OrganizationPage from './containers/Organization/OrganizationPage';
import NotFoundPage from './containers/NotFoundPage';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/organization" component={OrganizationPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
