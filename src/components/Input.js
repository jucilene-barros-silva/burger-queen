import React from 'react';
import { TextField } from '@material-ui/core';

const Input = ({ id, label, name, autoComplete, value, setValue, ...props }) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={name}
      autoComplete={autoComplete}
      autoFocus
      value={value}
      setValue={setValue}
      {...props}
    />
  );
};

export default Input;
