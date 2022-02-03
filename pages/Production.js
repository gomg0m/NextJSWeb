import React from 'react';
// import Header from './Header';
import styles from '../src/css/Production.module.css';
import {  Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, 
  FormControl, Select, TextField, Paper, InputBase, IconButton } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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


function Preproduction() {
  
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
  
  return (
    <>
      {/* <Header /> */}
        <Box className={styles.prebackground} sx={{ width: 1920, height: '100%', backgroundColor: '#F6F7FB', }} />
        <div className={styles.presubtitle}>제작공간</div>

        <Button className={styles.addproductionbutton} variant="contained" onClick={handleOpen}>+ 새로운 프로덕션 추가</Button>

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
          <Button className={styles.addclosebutton} variant="text" onClick={handleClose}>X</Button>

            <Typography className={styles.addtitle}>Production</Typography>
            <Typography className={styles.addsubtitle}>프로덕션을 추가해주세요.</Typography>
            <Divider className={styles.modalformdivider} orientation="horizontal" variant="fullWidth" flexItem />

            <div className={styles.addoption1}>프로덕션명</div>
            <TextField className={styles.info1} sx={{ minWidth: 570 }} id="outlined-basic" label="프로덕션명을 입력해주세요." variant="outlined"/>

            <div className={styles.addoption2}>희망연출정보</div>
            <FormControl className={styles.info2} sx={{ minWidth: 300 }}>
              <InputLabel id="demo-simple-select-label">희망연출정보</InputLabel>
              <Select
                value={info}
                label="info"
                displayEmpty
                onChange={handleChange}
              >
                <MenuItem value={1}>엔딩 장면 다수의 풍선 날리기</MenuItem>
                <MenuItem value={2}>사람형태의 빛 연출</MenuItem>
                <MenuItem value={3}>사람만한 과일 모형</MenuItem>
              </Select>
            </FormControl>

            <div className={styles.addoption3}>기술구체화협의명</div>
            <FormControl className={styles.info3} sx={{ minWidth: 300 }}>
              <InputLabel id="demo-simple-select-label">기술구체화협의명</InputLabel>
              <Select
                value={info}
                label="info"
                displayEmpty
                onChange={handleChange}
              >
                <MenuItem value={1}>다수의 풍선 날리기 기술구체화협의</MenuItem>
                <MenuItem value={2}>사과모형의 기술구체화협의</MenuItem>
                <MenuItem value={3}>사람형태의 빛 기술구체화협의</MenuItem>
              </Select>
            </FormControl>

            <div className={styles.addoption4}>대표 이미지</div>
            <TextField className={styles.info4} sx={{ minWidth: 510 }} id="outlined-basic" label="프로덕션 대표 이미지를 추가해주세요." variant="outlined"/>
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

export default Preproduction;