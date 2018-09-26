import React from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import {relationship_provider, relationship_provider_info} from '../../flux/provider/ProviderAction';
import Select from 'react-select';

const AddProviderForm = props => {
  const { 
    handleSubmitAddProvider,
    modelProvider,
    updateModelProvider,
    messageValidation,
    submitDisabled,
    listProviderCustomers,
    participantProviderOptions
  } = props;
  
  return (
    <div className="form-add-provider">

      <div className="form-section">
        <div className="form-subsection row">

          <h3>Add new provider</h3>
          <div className="form-group  col-lg-12">
            <label>Relationship</label>
            <Select 
              options={relationship_provider} 
              getOptionValue={(option) => option.key} 
              getOptionLabel={(option) => option.value} 
              onChange={(e) => updateModelProvider({field: 'relationship', value: e.key}) }
              value={
                modelProvider.relationship && { 
                  key: modelProvider.relationship,
                  value: relationship_provider.find(o => o.key === modelProvider.relationship).value,
                }
              }
            />
          </div>
          
          {  (
              modelProvider.relationship != 1 && // Self Assessement
              modelProvider.relationship != 5 && // Customer
              modelProvider.relationship != 6    // Supplier
             )  &&
          
              <div className="form-group col-lg-12">
                <label>Participant Provider</label>
                <Select 
                  options={participantProviderOptions} 
                  getOptionValue={(option) => option.id} 
                  getOptionLabel={(option) => option.name+' - '+option.position} 
                  onChange={(e) => updateModelProvider({field: 'id_provider', value: e.id}) }
                  value={
                    modelProvider.id_provider && { 
                      id: modelProvider.id_provider,
                      name: participantProviderOptions.find(o => o.id === modelProvider.id_provider).name,
                      position: participantProviderOptions.find(o => o.id === modelProvider.id_provider).position
                    }
                  }
                />

              </div>
          }
          
          {  
              (
               modelProvider.relationship == relationship_provider_info.customer.key || // Customer
               modelProvider.relationship == relationship_provider_info.supplier.key    // Supplier 
              ) && 
              
              <div className="col-lg-12">
                <div className="form-group">
                  <label>External Customer</label>
                  <Select 
                    options={listProviderCustomers} 
                    getOptionValue={(option) => option.id} 
                    getOptionLabel={(option) => option.name + ' - from: ' + option.organization_name} 
                    onChange={(e) => updateModelProvider({field: 'id_provider_customer', value: e.id}) }
                    value={
                      modelProvider.id_provider_customer && { 
                        id: modelProvider.id_provider_customer,
                        name: listProviderCustomers.find(o => o.id === modelProvider.id_provider_customer).name,
                        organization_name: listProviderCustomers.find(o => o.id === modelProvider.id_provider_customer).organization_name,
                      }
                    }
                  />
                </div>
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
