import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormInputProps } from "./FormInputProps";
import { Controller, useFormContext } from "react-hook-form";

export const FormInputMultilineText = ({ name, control, label }: FormInputProps) => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root':{ m: 1},
      }}
      noValidate
      autoComplete="off"
      >
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}            
            value={value}          
            label={label}
            variant="outlined"
            fullWidth
            multiline
            rows={7}
          />
          )}
          /> 
      </Box>    
      );
    };