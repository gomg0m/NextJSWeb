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
  schedule_id: string;
  schedule_writer: string;
  schedule_title: string;
  schedule_place: string;
  schedule_start: string;
  schedule_end: string;
  schedule_people: string;
  schedule_location: string;
  schedule_addtime: string;
};
  
const defaultValues = {
  schedule_id: "",
  schedule_writer: "",
  schedule_title: "",
  schedule_place: "",
  schedule_start: "",
  schedule_end: "",
  schedule_people: "",
  schedule_location: "",
  schedule_addtime: ""
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

  
  // 데이터베이스 연동
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
      
      <Button className={styles.addschebutton} variant="contained" onClick={handleOpen}>일정 추가</Button>


      <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
          <Button className={styles.addclosebutton} variant="text" onClick={handleClose}>X</Button>

            <Typography className={styles.addschetitle}>일정등록</Typography>
            <Typography className={styles.addschesubtitle}>일정을 등록해주세요.</Typography>
            <Divider className={styles.modaldivider} orientation="horizontal" variant="fullWidth" flexItem />

            <div className={styles.addscheoption1}>일정제목</div>
            <div className={styles.addinfo1} style={{width:"555px"}}><FormInputText name="schedule_title" control={control} label="제목을 입력해주세요."/></div>
 
            <div className={styles.addscheoption2}>소속협업공간</div>
            <div className={styles.addinfo2} style={{width:"555px"}}><FormInputText name="schedule_place" control={control} label="소속협업공간을 입력해주세요."/></div>

            <div className={styles.addscheoption3}>날짜선택</div>
            <div className={styles.datepicker3}><FormInputDatetimePicker name="schedule_start" control={control} label="시작일자"/></div>
            <div className={styles.datepicker4}><FormInputDatetimePicker name="schedule_end" control={control} label="종료일자"/></div>
            

            <div className={styles.addscheoption4}>참여자</div>
            <div className={styles.addinfo4} style={{width:"555px"}}><FormInputText name="schedule_people" control={control} label="참여자를 입력해주세요."/></div>

            <div className={styles.addscheoption5}>장소</div>
            <div className={styles.addinfo5} style={{width:"555px"}}><FormInputText name="schedule_location" control={control} label="장소를 입력해주세요."/></div>


            <Button className={styles.registerbutton} variant="contained" onClick={handleSubmit(onSubmit)}>등록하기</Button> 

          </Box>        
        </Modal>
      
    </>
  );
}

export default Schedule;