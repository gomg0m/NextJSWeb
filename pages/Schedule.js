import React from 'react';
import Header from '../src/fix/Header';
import styles from '../src/css/Schedule.module.css';
import styledcom from 'styled-components';
import ScheduleCalendar from './ScheduleCalendar';
import { Checkbox, FormControlLabel, Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, 
  FormControl, Select, TextField, Paper, InputBase, IconButton } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DateTimePicker from '@mui/lab/DateTimePicker';


// import { borderRadius } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 816,
  height: 666,
  bgcolor: 'background.paper',
  border: '1px solid #E0E0E0',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

// const ScheduleWrapper = styledcom.div`
//   position: relative;
// `;

function Postproduction() {

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
  
  // calendar (datepicker)
  const [value1, setValue1] = React.useState(new Date());
  const [value2, setValue2] = React.useState(new Date());
  const [value3, setValue3] = React.useState(new Date());
  const [value4, setValue4] = React.useState(new Date());
  // const [startDate, setStartDate] = React.useState(null);
  // const [endDate, setEndDate] = React.useState(null);
  
  return (
    <>
        <Box className={styles.schebackground} sx={{ width: '100%', height: '100%', backgroundColor: '#F6F7FB', }} />
      <Box className={styles.schebackgroundmid1} sx={{ width: 888, height: 917, backgroundColor: '#FFFFFF', }} />
      <div className={styles.calendarpos}>
        <ScheduleCalendar />
      </div>
      
      <Box className={styles.schebackgroundmid2} sx={{ width: 584, height: 917, backgroundColor: '#FFFFFF', }} />
      <div className={styles.schesubtitle}>일정관리</div>

      <Button className={styles.addschebutton} variant="contained" onClick={handleOpen}>일정 추가</Button>

      <div >다가오는 일정</div>

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
            <TextField className={styles.addinfo1} sx={{ minWidth: 570 }} id="outlined-basic" label="제목을 입력해주세요." variant="outlined"/>


            <div className={styles.addscheoption2}>소속협업공간</div>
            {/* 입력 필요 */}




            <div className={styles.addscheoption3}>날짜선택</div>
            <div className={styles.datepicker3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker 
                renderInput={(props) => <TextField {...props} />}
                label="일정 시작일"
                value={value3}
                onChange={(newValue) => {
                  setValue3(newValue);
                }}
              />
            </LocalizationProvider>
            </div>
            <div className={styles.datepicker4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker 
                renderInput={(props) => <TextField {...props} />}
                label="일정 종료일"
                value={value2}
                onChange={(newValue) => {
                  setValue4(newValue);
                }}
              />
            </LocalizationProvider>
            </div>


            <div className={styles.addscheoption4}>참여자</div>



            <div className={styles.addscheoption5}>장소</div>



            <Button className={styles.registerbutton} variant="contained">등록하기</Button> 

          </Box>        
        </Modal>
      
    </>
  );
}

export default Postproduction;