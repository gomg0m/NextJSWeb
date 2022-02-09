import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside';
import styles from '../src/css/Postproduction.module.css';
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
    <Header /> 
    <Leftside /> 
      <Box className={styles.postbackground} sx={{ width: 1026, height: '100%', backgroundColor: '#F6F7FB', }} />
      <div className={styles.postsubtitle}>철거 및 반출 협의</div>

      <Button className={styles.adddiscussbutton} variant="contained" onClick={handleOpen}>+ 새로운 철거 및 반출 협의 추가</Button>

      <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
          <Button className={styles.addclosebutton} variant="text" onClick={handleClose}>X</Button>

            <Typography className={styles.adddistitle}>철거 및 반출 협의</Typography>
            <Typography className={styles.adddissubtitle}>철거 및 반출협의 내용을 입력해주세요.</Typography>
            <Divider className={styles.modaldivider} orientation="horizontal" variant="fullWidth" flexItem />

            <div className={styles.adddisoption1}>제목</div>
            <TextField className={styles.disinfo1} sx={{ minWidth: 570 }} id="outlined-basic" label="철거 및 반출 협의 공간의 제목을 입력해주세요." variant="outlined"/>


            <div className={styles.adddisoption2}>철거일</div>
            <div className={styles.datepicker1}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker 
                renderInput={(props) => <TextField {...props} />}
                label="철거 시작일"
                value={value1}
                onChange={(newValue) => {
                  setValue1(newValue);
                }}
              />
            </LocalizationProvider>
            </div>
            <div className={styles.datepicker2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker 
                renderInput={(props) => <TextField {...props} />}
                label="철거 종료일"
                value={value2}
                onChange={(newValue) => {
                  setValue2(newValue);
                }}
              />
            </LocalizationProvider>
            </div>



            <div className={styles.adddisoption3}>반출일</div>
            <div className={styles.datepicker3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker 
                renderInput={(props) => <TextField {...props} />}
                label="반출 시작일"
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
                label="반출 종료일"
                value={value2}
                onChange={(newValue) => {
                  setValue4(newValue);
                }}
              />
            </LocalizationProvider>
            </div>


            <div className={styles.adddisoption4}>대표 이미지</div>
            <TextField className={styles.disinfo4} sx={{ minWidth: 510 }} id="outlined-basic" label="공연의 포스터, 공연 관련 이미지를 추가해주세요." variant="outlined"/>
            <Box className={styles.filebackground} sx={{ width: 48, height: 48, backgroundColor: '#F2F2F2', borderRadius: '6px' }} />
            <label htmlFor="icon-button-file" className={styles.fileuploadbutton}>
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton color="inherit" component="span" backgroundColor="#F2F2F2">
                <AttachFileIcon />
              </IconButton>
            </label>
            
            <Button className={styles.addcreatebutton} variant="contained">만들기</Button> 

          </Box>        
        </Modal>


      <div className={styles.order1}>최근 생성순</div>
      <div className={styles.order2}>모든상태</div>
    </>
  );
}

export default Postproduction;