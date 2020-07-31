import React from 'react';
import { Button } from '@material-ui/core';

const BtButton = (props) => {
  return   (
    <Button type="submit" fullWidth variant="contained" color="primary" >{props.name}
    </Button>
  )
}

export default BtButton;