import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

const options = [
  {
    label: "공연에서 차지하는 비중",
    value: "공연에서 차지하는 비중",
  },
  {
    label: "연출 영역(반경)",
    value: "연출 영역(반경)",
  },
  {
    label: "동선",
    value: "동선",
  },
  {
    label: "리프팅 높이",
    value: "리프팅 높이",
  },
  {
    label: "이동 거리",
    value: "이동 거리",
  },
  {
    label: "속도",
    value: "속도",
  },
  {
    label: "이동 시의 움직임",
    value: "이동 시의 움직임",
  },
];

export const FormInputDropdown2 = ({name,control, label}) => {

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
        <Select onChange={onChange} value={value}>
          {generateSelectOptions()}
        </Select>
      )}
    />
};