import React from 'react';
import { Field, reduxForm, Control } from 'redux-form';
import RenderField from '../Form/RenderField'
import {validateEmail} from '../../utils/Tools'

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  }
  if( !validateEmail(values.email) ){
    errors.email = 'Email not valid.'
  }
  return errors;
}

const ParticipantForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      
      <h3>Personal Details</h3>
      <Field name="name" type="text" component={RenderField}  label="Name" />
      <Field name="email" type="text" component={RenderField}  label="Email" />
      <Field name="position" type="text" component={RenderField}  label="Position" />
      
      <h3>360 Feedback</h3>
      <h4>Self Assessment</h4>
      <Field type="checkbox" 
             name="self_assessment"
             defaultChecked={true} 
             id="self_assessment" 
             component={RenderField} 
             label="Invite to submit a self-assessment"
            />
      <br/>
      <h4>Feedback providers</h4>
      <h5>You can choose the feedback providers after adding this person, or invite them to choose.</h5>
      
      <Field 
        type="checkbox" 
        name="choose_own_feedback_provider" 
        id="choose_own_feedback_provider" 
        component={RenderField}  
        label="Invite to choose own feedback providers"/>
      
      <Field 
        type="checkbox" 
        name="feedback_provider_needs_approval" 
        id="feedback_provider_needs_approval" 
        component={RenderField}  
        label="Their list of feedback providers needs approval" />
      
      <br/>
      <h4>Report reviewer</h4>
      <h5>Adding a report reviewer makes it easy to share the feedback report with (e.g.) their coach or line manager.</h5>
      <Field name="id_participant_feedback_reviewer" check={true} type="text" component={RenderField}  label="Report Reviewer" description=""/>
      
      <div>
        <button className="btn-primary" type="submit" disabled={submitting}>Save</button>
      </div>

    </form>
  );
};

export default reduxForm({
  form: 'new_participant',
  validate
})(ParticipantForm);
