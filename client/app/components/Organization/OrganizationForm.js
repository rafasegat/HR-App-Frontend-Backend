import React from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';

const OrganizationForm = props => {
  const { 
    handleSubmit,
    modelCurrent,
    updateModel,
    messageValidation,
    submitDisabled
  } = props;
  
  return (
    <div className="organization-form">
      
      <input type="hidden" value={modelCurrent.id} onChange={(e) => updateModel({field: 'id', value: e.target.value}) } />
      
      <div className="form-group">
        <label>Name</label>
        <InputText value={modelCurrent.name} onChange={(e) => updateModel({field: 'name', value: e.target.value}) } />
      </div>

      <div>
        <Button onClick={handleSubmit} type="submit" className="btn-primary" disabled={submitDisabled} label="Save"/>
        <div className='messageErrors'>{messageValidation}</div>
      </div>

    </div>
  );
};

export default OrganizationForm;