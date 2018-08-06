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
            <Select  id="relationship" options={relationship_provider} value={modelProvider.relationship} onChange={ (e) => { updateDataProvider({field: 'relationship', value: e.target.value}) } } />
          </div>
          
          {  modelProvider.relationship!=1 &&
          
            <div className="form-group col-lg-6">
              <label>Participant</label>
              <Select  id="id_participant" options={participant_provider} value={modelProvider.id_participant} onChange={ (e) => { updateDataProvider({field: 'id_participant', value: e.target.value}) } } />
              {/* <InputText id="name"  value={modelProvider.name} onChange={(e) => updateDataProvider({field: 'name', value: e.target.value}) } /> */}
            </div>

          }

          <div className="col-lg-12">
            <Button className="btn-primary" onClick={handleSubmitAddProvider} label="Add" disabled={submitDisabled}/>
            <div className='messageErrors'>{messageValidation}</div>
          </div>
        
        </div>

      </div>
    
    </div>
  );
};

export default AddProviderForm;
