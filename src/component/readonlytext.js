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
            id="outlined-read-only-input"
            label="공연 이미지 파일"
            defaultValue={labeltext}
            InputProps={{
            readOnly: true,
            }}
        />
     </div>
    </Box>
  );
}


