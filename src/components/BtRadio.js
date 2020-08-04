import React from 'react';

// import {RadioGroup, FormControlLabel, FormControl, Radio} from '@material-ui/core'

// const BtRadio = ({ options, label, value, setValue, onChange, ...props}) => {

//   return (
//   <>
//   <FormControl component="fieldset">
//   <RadioGroup row  aria-label="gender" name="gender1"  onChange={onChange} >
//     { options.map((option)=> (     
//         <FormControlLabel value={value} control={<Radio />} label={option} name={option} />))}
//   </RadioGroup >
//   </FormControl>   
//     </>
//   )
//     }
//  export default BtRadio;

const BtRadio =({ options, value, label, setValue, text, onChange, name, ...props}) => {
  return (
    <>

            <label>
              <input type="radio" name="radio" value={value} {...props} />
              {text}             
            </label>
          
    </>
  )
}

export default BtRadio;
