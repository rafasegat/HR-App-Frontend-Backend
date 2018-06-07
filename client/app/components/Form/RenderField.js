import React from 'react';
import { Control, Form } from 'react-redux-form';

const RenderField = ({
    input,
    name,
    label,
    type,
    description,
    meta: { touched, error, warning }
  }) => {
    
    
    if(type=='text')
      return(
        <div className="input-row text">
          <label>{label}</label>
          <div className="input-field">
            <input  {...input} type={type} />
            {description && <span className="description">{description}</span>}
            {touched && ((error && <span className="warning">{error}</span>) || (warning && <span>{warning}</span>))}
          </div>
        </div>
      );

      if(type=='checkbox')
        return(
          <Control.checkbox
            model={name}
            getValue={(event) => event.target.value}
          />
          // <div className="input-row checkbox">
          //   <div className="input-field">
          //     <input  {...input} type={type} checked={checked} />
          //     {label && <label className="label-checkbox">{label}</label>}
          //     {touched && ((error && <span className="warning">{error}</span>) || (warning && <span>{warning}</span>))}
          //   </div>
          // </div>
        );

  }

export default RenderField;
