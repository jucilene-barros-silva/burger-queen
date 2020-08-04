import React from 'react';

// import {RadioGroup, FormControlLabel, FormControl, Radio} from '@material-ui/core'

// const BtRadio = (props) => {

//   return (
//     <FormControl component="fieldset">
//       <RadioGroup row  aria-label="gender" name="gender1" onChange={props.onChange}>
//         <FormControlLabel value={props.value1} control={<Radio />} label={props.label1} />
//         <FormControlLabel value={props.value2} control={<Radio />} label={props.label2} />
//       </RadioGroup >
//     </FormControl>
//   )
// } 

//  export default BtRadio;

const BtRadio =({id, value, onChange, htmlFor, text, ...props}) => {
  return (
    <>
        <input 
            id={id}
            type="radio"
            value={value}
            onChange={onChange}
            {...props}
        />
        <label htmlFor={htmlFor}>
            {text}
        </label>
    </>
  )
}

export default BtRadio;
