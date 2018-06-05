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

const ParticipantForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h3>Personal Details</h3>
      <Field name="name" type="text" component={RenderField}  label="Name" />
      <Field name="email" type="text" component={RenderField}  label="Email" />
      <Field name="position" type="text" component={RenderField}  label="Position" />
      <h3>360 Feedback</h3>
      <Field name="self_assessment" type="checkbox" component={RenderField}  label="Self Assessment" description="Invite to submit a self-assessment" />
      <p>Feedback providers: You can choose the feedback providers after adding this person, or invite them to choose.</p>
      <Field name="choose_own_feedback_provider" type="checkbox" component={RenderField}  label="Choose own feedback provider" description="Choose own feedback provider" />
      <Field name="feedback_provider_needs_approval" type="checkbox" component={RenderField}  label="Choose own feedback provider" description="Choose own feedback provider" />
      <Field name="id_participant_feedback_reviewer" type="text" component={RenderField}  label="Report Reviewer" description="Adding a report reviewer makes it easy to share the feedback report with (e.g.) their coach or line manager."/>
      <div>
        <button className="btn-primary" type="submit" disabled={submitting}>Submit </button>
      </div>

    </form>
  );
};

export default reduxForm({
  form: 'participant',
  validate
})(ParticipantForm);
