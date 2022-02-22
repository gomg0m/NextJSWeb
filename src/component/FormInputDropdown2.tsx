import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import Box from '@mui/material/Box';

const options = [
  {
    label: "기술팀",
    value: "기술팀",
  },
  {
    label: "기획팀",
    value: "기획팀",
  },
  {
    label: "디자인팀",
    value: "디자인팀",
  },
  {
    label: "무대팀",
    value: "무대팀",
  },
  {
    label: "연출팀",
    value: "연출팀",
  }
];

export const FormInputDropdown = ({name,control, label}) => {

  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => ( 
        <Box sx={{ minWidth: 60 }}>
        <FormControl fullWidth>
        <InputLabel>소속팀을 선택해주세요.</InputLabel>
        <Select onChange={onChange} value={value}>
          {generateSelectOptions()}
        </Select>
        </FormControl>
        </Box>
      )}
    />
};