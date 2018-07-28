import React from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';

const ProjectForm = props => {
  const { 
    modelProject,
    updateModelProject,
    handleSubmit
  } = props;
  
  return (
    <div className="project-form">
      
      <div class="form-group">
        <label>Name</label>
        <InputText id="name" value={modelProject.name} onChange={(e) => updateModelProject({field: 'name', value: e.target.value}) } />
      </div>

      <div>
        <button onClick={handleSubmit} className="btn-primary" type="submit">Submit</button>
      </div>

    </div>
  );
};

export default ProjectForm;
