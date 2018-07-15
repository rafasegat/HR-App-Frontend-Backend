import React from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';

const RenderField = ({
    input,
    label,
    type,
    description,
    checked,
    meta: { touched, error, warning }
  }) => {
    
    if(type=='text')
      return(
         <div className="input-row text">
           <label>{label}</label>
           <div className="input-field">
             <InputText  {...input}  />
             {description && <span className="description">{description}</span>}
             {touched && ((error && <span className="warning">{error}</span>) || (warning && <span>{warning}</span>))}
           </div> 
         </div>
      );

      if(type=='checkbox'){
        //console.log(input, checked);
        return(
          <div className="input-row checkbox">
            <div className="input-field">
              <input type={type} {...input} />
              {label && <label className="label-checkbox">{label}</label>}
              {touched && ((error && <span className="warning">{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
          </div>
        );
      }

  }

export default RenderField;
