import React from 'react';
import FormGroup from '../../components/Form/FormLayout';
import Btn  from '@atlaskit/button';
import FieldText  from '@atlaskit/field-text';
import Form, { Field } from '@atlaskit/form';

const OrganizationForm = props => {
  const { 
    handleSubmit,
    modelCurrent,
    updateModel,
    messageValidation,
    isLoading
  } = props;
  
  return (
    <div className="organization-form">
      
      <FormGroup>
        <input type="hidden" value={modelCurrent.id}/>
        <FieldText value={modelCurrent.name}  shouldFitContainer={true} label="Name" className="field-group" onChange={(e) => updateModel({field: 'name', value: e.target.value}) } />
      </FormGroup>

      <div>
        <Btn isLoading={isLoading} appearance='primary' onClick={handleSubmit}>Save</Btn>
        <div className='messageErrors'>{messageValidation}</div>
      </div>

    </div>
  );
};

export default OrganizationForm;