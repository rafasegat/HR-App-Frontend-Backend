import React from 'react';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {SelectButton} from 'primereact/components/selectbutton/SelectButton';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import Select from '../../components/Form/Select';
import {relationship_provider} from '../../flux/provider/ProviderAction';

const AddProviderForm = props => {

  const { 
    handleSubmitAddProvider,
    modelProvider,
    updateDataProvider,
    messageValidation,
    submitDisabled
  } = props;
  
  return (
    <div className="form-add-provider">

      <div className="form-section">
        <div className="form-subsection row">

          <h3>Add new provider</h3>

          <div className="form-group  col-lg-6">
            <label>Relationship</label>
            <Select id="relationship" options={relationship_provider} value={modelProvider.relationship} onChange={(e) => updateDataProvider({field: 'relationship', value: e.target.value}) }/>
          </div>
          
          <div className="form-group col-lg-6">
            <label>Name</label>
            <InputText id="name" value={modelProvider.name} onChange={(e) => updateDataProvider({field: 'name', value: e.target.value}) } />
          </div>

          <div>
            <Button className="btn-primary" onClick={handleSubmitAddProvider} label="Add" disabled={submitDisabled}/>
            <div className='messageErrors'>{messageValidation}</div>
          </div>
        
        </div>

      </div>
    
    </div>
  );
};

export default AddProviderForm;
