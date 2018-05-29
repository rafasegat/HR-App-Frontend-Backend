import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../Form/RenderField'

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  return errors;
}

const OrganizationForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" type="text" component={RenderField}  label="Name" />
      <div>
        <button className="btn-primary" type="submit" disabled={submitting}>Submit </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'organization',
  validate
})(OrganizationForm);
