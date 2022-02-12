import React from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { FormInputProps } from "./FormInputProps";
import { Controller, useFormContext } from "react-hook-form";

export const FormInputDatetimePicker = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
        }) => (
          <Stack component="form" noValidate spacing={3}>
            <TextField
              helperText={error ? error.message : null}          
              error={!!error}
              onChange={onChange}
              value={value}
              label={label}
              variant="outlined"      
              id="datetime-local"
              type="datetime-local"
              // defaultValue="2017-05-24T10:30"
              fullWidth
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
        </Stack>
        )}
    />
  );
}