import React from 'react';
import { Link } from '@material-ui/core';

const LinkRel= (props) => {
  return (
    <Link href="#" variant="body2">
      {props.name}
    </Link>
  );
};

export default LinkRel;