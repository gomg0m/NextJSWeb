import * as React from 'react';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function IconLabelButtons({labeltext}) {
  return (
      <Button endIcon={<HighlightOffIcon />} variant="outlined" >
        {labeltext}
      </Button>
  );
}