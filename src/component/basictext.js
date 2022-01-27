import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields({labeltext}) {
  return (
    <Box
      component="form"      
      sx={{m: 1}}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          fullWidth
          id="outlined-required"
          label={labeltext}
          variant="outlined"          
        />
     </div>
    </Box>
  );
}