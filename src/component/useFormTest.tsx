import { Button, Paper, Typography } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "./FormInputText";
import { FormInputMultiCheckbox } from "./FormInputMultiCheckbox";
import { FormInputDropdown } from "./FormInputDropdown";
import { FormInputDate } from "./FormInputData";
import { FormInputSlider } from "./FormInputSlider";
import { FormInputRadio } from "./FormInputRadio";

interface IFormInput {
textValue: string;
radioValue: string;
checkboxValue: string[];
dateValue: Date;
dropdownValue: string;
sliderValue: number;
}

const defaultValues = {
  textValue: "",
  radioValue: "",
  checkboxValue: [],
  dateValue: new Date(),
  dropdownValue: "",
  sliderValue: 0,
};

const FormDemo = () => {
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <Paper>
      <Typography variant="h6"> Form Demo </Typography>

      <FormInputText name="textValue" control={control} label="Text Input" />

{/*
   <FormInputRadio name={"radioValue"} control={control} label={"Radio Input"} />    
   <FormInputDropdown name="dropdownValue"control={control}label="Dropdown Input"/>
   <FormInputDate name="dateValue" control={control} label="Date Input" /> 
      <FormInputMultiCheckbox
        control={control}
        setValue={setValue}
        name={"checkboxValue"}
        label={"Checkbox Input"}
      />
*/}

      <FormInputSlider
        name={"sliderValue"}
        control={control}
        setValue={setValue}
        label={"Slider Input"}
      />

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>
    </Paper>
  );
};

export default FormDemo;