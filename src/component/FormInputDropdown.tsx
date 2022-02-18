import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import Box from '@mui/material/Box';


export const FormInputDropdown = ({MenuList, name, control, label}) => {
  console.log("홈네임리스트", MenuList);
  const generateSelectOptions = () => {
    return MenuList.map((item) => {
      return (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      );
    });
  };

  return <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => ( 
        <Box >
        <FormControl fullWidth>
        {/* <InputLabel>클릭해서 선택해주세요</InputLabel> */}
        <Select onChange={onChange} value={value}>
          {generateSelectOptions()}
        </Select>
        </FormControl>
        </Box>
      )}
    />
};