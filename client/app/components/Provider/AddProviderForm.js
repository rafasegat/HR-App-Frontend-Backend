import React from 'react';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {SelectButton} from 'primereact/components/selectbutton/SelectButton';
import {InputText} from 'primereact/components/inputtext/InputText';

const AddProviderForm = props => {

  const { 
    handleSubmitAddProvider,
    newProvider,
    updateDataProvider
  } = props;

  return (
    <div>
        <InputText value={newProvider.name} onChange={(e) => updateDataProvider({field: 'name', value: e.target.value}) } />
        <InputText value={newProvider.last} onChange={(e) => updateDataProvider({field: 'last', value: e.target.value}) } />
      <div>
        <button className="btn-primary" onClick={handleSubmitAddProvider} >Add</button>
      </div>
    </div>
  );
};

export default AddProviderForm;
