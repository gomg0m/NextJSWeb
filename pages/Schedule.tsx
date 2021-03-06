import React, { useState, useEffect } from 'react';
import Header from '../src/fix/Header';
import styles from '../src/css/Schedule.module.css';
import styledcom from 'styled-components';
import ScheduleCalendar from './ScheduleCalendar';
import { Checkbox, FormControlLabel, Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, 
  FormControl, Select, TextField, Paper, InputBase, IconButton } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { FormInputText } from "../src/component/FormInputText";
import { FormInputDatetimePicker } from "../src/component/FormInputDatetimePicker";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Router from 'next/router';
import moment from 'moment';
import TestSchedule from './testScheduler';
// import Schedule from './ScheduleCalendar';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  height: 580,
  bgcolor: 'background.paper',
  border: '1px solid #E0E0E0',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};



//  =======================================
interface IFormInput {
  schedule_title:String;
  schedule_start:String;
  schedule_end:String;
  schedule_participants:String;
  schedule_place:String;
  schedule_taskspace:String;
  }
  
  const defaultValues = {
      schedule_title:"",
      schedule_start:"",
      schedule_end:"",
      schedule_participants:"",
      schedule_place: "",
      schedule_taskspace:"",
  };
  


function Schedule() {

  // Modal Open/Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Select information
  const [info, setInfo] = React.useState('');
  const handleChange = (event) => {setInfo(event.target.value);};

  const Input = styled('input')({
    display: 'none',
  });

  
  // ?????????????????? ??????
  const methods = useForm({ defaultValues: defaultValues });

  const { handleSubmit, reset, control, setValue } = methods;
  
  const onSubmit = (data: IFormInput) => {

        Axios.post("/api/getScheduleInfo", {data}).then((res)=>{
            if(res.status == 200){
                Router.push("/Schedule");
               
            }
        });
    }
  
  return (
    <>
    

      <div className={styles.calendarpos}>
        {/* <ScheduleCalendar /> */}
        <TestSchedule />
      </div>
      
      <Box className={styles.schebackgroundmid2} sx={{ width: 584, height: 917, backgroundColor: '#FFFFFF', }} />
      
      <Button className={styles.addschebutton} variant="contained" onClick={handleOpen}>?????? ??????</Button>


      <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
          <Button className={styles.addclosebutton} variant="text" onClick={handleClose}>X</Button>

            <Typography className={styles.addschetitle}>????????????</Typography>
            <Typography className={styles.addschesubtitle}>????????? ??????????????????.</Typography>
            <Divider className={styles.modaldivider} orientation="horizontal" variant="fullWidth" flexItem />

            <div className={styles.addscheoption1}>????????????</div>
            <div className={styles.addinfo1} style={{width:"555px"}}><FormInputText name="schedule_title" control={control} label="????????? ??????????????????."/></div>
 
            <div className={styles.addscheoption2}>??????????????????</div>
            <div className={styles.addinfo2} style={{width:"555px"}}><FormInputText name="schedule_place" control={control} label="????????????????????? ??????????????????."/></div>

            <div className={styles.addscheoption3}>????????????</div>
            <div className={styles.datepicker3}><FormInputDatetimePicker name="schedule_start" control={control} label="????????????"/></div>
            <div className={styles.datepicker4}><FormInputDatetimePicker name="schedule_end" control={control} label="????????????"/></div>
            

            <div className={styles.addscheoption4}>?????????</div>
            <div className={styles.addinfo4} style={{width:"555px"}}><FormInputText name="schedule_people" control={control} label="???????????? ??????????????????."/></div>

            <div className={styles.addscheoption5}>??????</div>
            <div className={styles.addinfo5} style={{width:"555px"}}><FormInputText name="schedule_location" control={control} label="????????? ??????????????????."/></div>


            <Button className={styles.registerbutton} variant="contained" onClick={handleSubmit(onSubmit)}>????????????</Button> 

          </Box>        
        </Modal>
      
    </>
  );
}

export default Schedule;