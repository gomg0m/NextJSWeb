import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import Box from '@mui/material/Box';

const options = [
  {
    label: "사전확인",
    value: "사전확인",
  },
  {
    label: "사업계획",
    value: "사업계획",
  },
  {
    label: "고려사항",
    value: "고려사항",
  },
  {
    label: "대상물",
    value: "대상물",
  },
  {
    label: "연출내용",
    value: "연출내용",
  },
  {
    label: "구현환경",
    value: "구현환경",
  },
  {
    label: "반입 및 설치",
    value: "반입 및 설치",
  },
];

export const FormInputDropdown1 = ({name,control, label}) => {

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
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
      <InputLabel>검토 주제를 선택하세요</InputLabel>
      <Select onChange={onChange} value={value}>
        {generateSelectOptions()}
      </Select>
      </FormControl>
      </Box>
    )}
  />
};