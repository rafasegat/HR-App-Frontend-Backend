import React from 'react';

const RenderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div className="input-row">
      <label>{label}</label>
      <div className="input-field">
        <input  {...input} type={type} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

export default RenderField;
