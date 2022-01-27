import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields({labeltext}) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root':{ m: 1},
      }}
      noValidate
      autoComplete="off"
      >
      <div>
         <TextField
          fullWidth
          id="filled-multiline-static"
          label={labeltext}
          multiline
          rows={7}
          defaultValue=""
        />
      </div>
    </Box>
  );
}