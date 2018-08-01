import React from 'react';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {SelectButton} from 'primereact/components/selectbutton/SelectButton';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';

const AddProviderForm = props => {

  const { 
    handleSubmitAddProvider,
    modelProvider,
    updateDataProvider
  } = props;

  return (
    <div className="form-add-provider">

      <div className="form-section">
        <div className="form-subsection">

          <div className="form-group">
            <label>Name</label>
            <InputText value={modelProvider.name} onChange={(e) => updateDataProvider({field: 'name', value: e.target.value}) } />
          </div>

          <div className="form-group">
            <label>Relationship</label>
            <select value={modelProvider.relationship} onChange={(e) => updateDataProvider({field: 'relationship', value: e.target.value}) }>
              <option value="self">Self Assessment</option>
              <option value="2 cdscds">2 cdscds</option>
              <option>3 cddscs</option>
              <option>4 cdscds</option>
            </select>
          </div>
        
        </div>

          <div>
            <Button className="btn-primary" onClick={handleSubmitAddProvider} label="Add" />
          </div>
      </div>
    
    </div>
  );
};

export default AddProviderForm;
