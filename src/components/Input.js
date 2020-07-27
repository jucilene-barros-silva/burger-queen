import React from 'react';
import { TextField } from '@material-ui/core';

const Input = (props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      autoComplete={props.type}
      autoFocus
      value={props.setEmail}
    />
  );
};

export default Input;
