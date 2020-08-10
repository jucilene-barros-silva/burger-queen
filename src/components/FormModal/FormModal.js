import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './FormModal.css';
import Button from '../Button.js';

const BtHamburger = ({ value, onChange, ...props }) => {
  return (
    <div className="container">
      <FormControl component="fieldset">
        <FormLabel component="legend">Hambúrguerer</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={onChange}
        >
          <FormControlLabel
            value="Carne bovina"
            control={<Radio />}
            label="Carne bovina"
            {...props}
          />
          <FormControlLabel value="Frango" control={<Radio />} label="Frango" />
          <FormControlLabel
            value="Vegetariano"
            control={<Radio />}
            label="Vegetariano"
          />
        </RadioGroup>
      </FormControl>
    
      <FormControl component="fieldset">
        <FormLabel component="legend">Adicionais (R$ 1,00 cada):</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={onChange}
        >
          <FormControlLabel
            value="ovo"
            control={<Radio />}
            label="Ovo"
            {...props}
          />
          <FormControlLabel value="queijo" control={<Radio />} label="Queijo" />
        </RadioGroup>
      </FormControl>
    <div>
      <Button Button name="Adicionar" onClick={() => alert('additional')}/>
      <Button Button name="Cancelar" onClick={() => alert('additional')}/>
      </div>  
    </div>
  );
};
export default BtHamburger;
