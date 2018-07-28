import React from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';

const OrganizationForm = props => {
  const { 
    handleSubmit,
    modelOrganization,
    updateModelOrganization 
  } = props;
  
  return (
    <div className="organization-form">
      
      <div className="form-group">
        <label>Name</label>
        <InputText value={modelOrganization.name} onChange={(e) => updateModelOrganization({field: 'name', value: e.target.value}) } />
      </div>

      <div>
        <button onClick={handleSubmit} type="submit" className="btn-primary" >Submit </button>
      </div>
    </div>
  );
};

export default OrganizationForm;