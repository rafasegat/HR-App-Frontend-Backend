import React from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';

const ProjectForm = props => {
  const { 
    modelCurrent,
    updateModel,
    handleSubmit,
    messageValidation,
    submitDisabled
  } = props;
  
  return (
    <div className="project-form">
      
      <input type="hidden" value={modelCurrent.id} onChange={(e) => updateModel({field: 'id', value: e.target.value}) } />
      
      <div className="form-group">
        <label>Name</label>
        <InputText id="name" value={modelCurrent.name} onChange={(e) => updateModel({field: 'name', value: e.target.value}) } />
      </div>

      <div>
        <Button onClick={handleSubmit} className="btn-primary" type="submit" label="Save" disabled={submitDisabled} />
        <div className='messageErrors'>{messageValidation}</div>
      </div>

    </div>
  );
};

export default ProjectForm;
