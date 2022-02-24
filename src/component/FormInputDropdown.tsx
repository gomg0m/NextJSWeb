import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import Box from '@mui/material/Box';


export const FormInputDropdown = ({MenuList, name, control, label}) => {
  const generateSelectOptions = () => {
    return MenuList && MenuList.map((item) => {
      return (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      );
    });
  };
  // 위에 map에 && 안 넣으면 오류. 왜냐하면 React는 return에서 MenuList.map을
  // 반복 실행할 때 첫 턴에 데이터가 아직 안들어와도 렌더링이 실행되며 당연히
  // 그 데이터는 undefined로 정의되어 오류가 난다!

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