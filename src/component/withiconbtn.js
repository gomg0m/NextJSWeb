import * as React from 'react';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const Deleted =() =>{console.log("Deleted!")};

export default function IconLabelButtons({labeltext}) {
  return (
      <Button endIcon={<HighlightOffIcon onClick={Deleted}/>} variant="outlined" >
        {labeltext}
      </Button>
  );
}