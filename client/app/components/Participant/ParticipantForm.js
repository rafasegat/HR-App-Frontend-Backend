import React from 'react';
import {validateEmail} from '../../utils/Tools'
import {InputText} from 'primereact/components/inputtext/InputText';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {Button} from 'primereact/components/button/Button';

const ParticipantForm = props => {
  const { 
    handleSubmit,
    modelParticipant,
    updateModelParticipant,
    reportReviewerData,
    reportReviewerSuggestions,
    filterReportReviewer
  } = props;
  

  return (
    <div className="participant-form">
      <div className="form-group">

        <h3>Personal Details</h3>

        <div className="form-input">
          <label>Name</label>
          <InputText validateOnly={true} value={modelParticipant.name} onChange={(e) => updateModelParticipant({field: 'name', value: e.target.value}) } />
        </div>

        <div className="form-input">
          <label>Email</label>
          <InputText value={modelParticipant.email} onChange={(e) => updateModelParticipant({field: 'email', value: e.target.value}) } />
        </div>

        <div className="form-input">
          <label>Position</label>
          <InputText value={modelParticipant.position} onChange={(e) => updateModelParticipant({field: 'position', value: e.target.value}) } />
        </div>
      
      </div>

      <div className="form-group">

        <h3>360 Feedback</h3>
        <h4>Self Assessment</h4>
        
        <div className="form-input">
          <label>Invite yourself to submit a self-assessment</label>
          <Checkbox 
            checked={modelParticipant.self_assessment} 
            onChange={(e) => updateModelParticipant({field: 'self_assessment', value: e.checked}) } ></Checkbox>
        </div>
      
      </div>
      
      <div className="form-group">

        <h4>Feedback providers</h4>
        <h5>You can choose the feedback providers after adding this person, or invite them to choose.</h5>
        
        <div className="form-input">
            <label>Invite to choose own feedback providers</label>
            <Checkbox 
              checked={modelParticipant.choose_own_feedback_provider} 
              onChange={(e) => updateModelParticipant({field: 'choose_own_feedback_provider', value: e.checked}) } ></Checkbox>
        </div>
        
        <div className="form-input">
            <label>Their list of feedback providers needs approval</label>
            <Checkbox 
              checked={modelParticipant.feedback_provider_needs_approval} 
              onChange={(e) => updateModelParticipant({field: 'feedback_provider_needs_approval', value: e.checked}) } ></Checkbox>
        </div>
      
      </div>

      <div className="form-group">
      
        <h4>Report reviewer</h4>
        <h5>Adding a report reviewer makes it easy to share the feedback report with (e.g.) their coach or line manager.</h5>
        
        <div className="form-input">
            <label>Report Reviewer</label>
            <AutoComplete 
              dropdown={true}
              value={modelParticipant.id_participant_feedback_reviewer} 
              suggestions={reportReviewerSuggestions}
              completeMethod={filterReportReviewer}
              onChange={(e) => updateModelParticipant({field: 'id_participant_feedback_reviewer', value: e.value}) }
            />
        </div>
      
      </div>
      
      <div>
        <Button onClick={handleSubmit} className="btn-primary" label="Save" />
      </div>

    </div>
  );
};

export default ParticipantForm;
