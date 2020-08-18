import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const BtRadio = ({ value, onChange }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Cargo</FormLabel>
      <RadioGroup
        row
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value="hall" control={<Radio />} label="Salão" />
        <FormControlLabel value="kitchen" control={<Radio />} label="Cozinha" />
      </RadioGroup>
    </FormControl>
  );
};
export default BtRadio;
