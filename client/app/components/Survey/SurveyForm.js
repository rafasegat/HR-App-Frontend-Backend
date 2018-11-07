import React from 'react';
import { validateEmail } from '../../utils/Tools'
import { InputText } from 'primereact/components/inputtext/InputText';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { AutoComplete } from 'primereact/components/autocomplete/AutoComplete';
import { Button } from 'primereact/components/button/Button';
import Select from 'react-select'

const SurveyForm = props => {
  const { 
    handleSubmit,
    modelCurrent,
    updateModel,
    messageValidation,
    submitDisabled
  } = props;

  
  return (
    <div className="provider-customer-form">
      
      <div className="form-section">
        
        <input type="hidden" value={modelCurrent.id} onChange={(e) => updateModel({field: 'id', value: e.target.value}) } />
        
        <div className="form-group">
          <label>Name</label>
          <InputText value={modelCurrent.name} onChange={(e) => updateModel({field: 'name', value: e.target.value}) } />
        </div>
       
      </div>
      
      <div>
        <Button onClick={handleSubmit} className="btn-primary" label="Save"  disabled={submitDisabled} />
        <div className='messageErrors'>{messageValidation}</div>
      </div>

    </div>
  );
};

export default SurveyForm;