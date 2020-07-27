import React,  { useState } from 'react'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const Checkbox = (props) => {

  return (
    <FormControl component="fieldset">
      <RadioGroup row  aria-label="gender" name="gender1"  onChange={props.handleChange}>
        <FormControlLabel value={props.value1} label={props.label1} />
        <FormControlLabel value={props.value2} label={props.label2} />


      </RadioGroup >
    </FormControl>
    
  )
}

export default Checkbox
