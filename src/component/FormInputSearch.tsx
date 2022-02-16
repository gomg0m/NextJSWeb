import React, {useState, useEffect} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { FormInputProps } from "./FormInputProps";

const options = ["김진영", "조자양", "김승조", "윤다예", "김지만"];

export const FormInputSearch = (props) =>{
  const [inputValue, setInputValue] = useState('');
  const [value1, setValue1] = useState("조자양");
  
  const onChange1=(event, newValue) => {
    console.log(newValue);
    setValue1(newValue); 
    props.getdata(newValue);
  }

   return (
       <Autocomplete
            value={value1}
            onChange={onChange1}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}            
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={props.label} />}
            />
          )                    
  
}