import React from 'react';
import FormGroup from '../../components/Form/FormLayout';
import Btn  from '@atlaskit/button';
import FieldText  from '@atlaskit/field-text';
import Form, { FieldGroup } from '@atlaskit/form';

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
      
      <FormGroup>
        <input type="hidden" value={modelCurrent.id} />
        <FieldText label="Name" shouldFitContainer={true} value={modelCurrent.name} onChange={(e) => updateModel({field: 'name', value: e.target.value}) } />
      </FormGroup>

      <div>
        <Btn onClick={handleSubmit} appearance='primary'>Save</Btn>
        <div className='messageErrors'>{messageValidation}</div>
      </div>

    </div>
  );
};

export default ProjectForm;
