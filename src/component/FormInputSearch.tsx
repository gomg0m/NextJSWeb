import React, {useState, useEffect} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@material-ui/core/TextField";

export const FormInputSearch = (props) =>{
  const [inputValue, setInputValue] = useState('');
  const [value1, setValue1] = useState("");
  
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
            options={props.options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={props.label} />}
            />
          )                    
  
}