import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route,  Link, Switch } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form'
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import PrivateRoute from './containers/Auth';
import OrganizationPage from './containers/Organization/OrganizationPage';
import ProjectPage from './containers/Project/ProjectPage';
import NotFoundPage from './containers/NotFoundPage';
import './styles/styles.scss';

// Handle our Redux Form stuffs
const rootReducer = combineReducers({
  form: formReducer
});

const store = createStore(rootReducer);

render((
  <Router>
    <Provider store={store}>
      <App>
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <PrivateRoute path="/organizations" component={OrganizationPage}/>
          <PrivateRoute path="/projects" component={ProjectPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </App>
    </Provider>
  </Router>
), document.getElementById('app'));
