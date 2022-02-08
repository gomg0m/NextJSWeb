import React from 'react';
import Header from '../src/fix/Header';
import styles from '../src/css/Notice.module.css';
import { Checkbox, FormControlLabel, Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, 
  FormControl, Select, TextField, Paper, InputBase, IconButton, Input } from '@mui/material';
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


function Notice() {
  
  // Modal Open/Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // // Select information
  // const [info, setInfo] = React.useState('');
  // const handleChange = (event) => {setInfo(event.target.value);};

  // const Input = styled('input')({
  //   display: 'none',
  // });
  
  // // calendar (datepicker)
  // const [startDate, setStartDate] = React.useState(null);
  // const [endDate, setEndDate] = React.useState(null);

  return (
    <>
    <Header />
      <Box className={styles.noticebackground1} sx={{ width: 1581, height: '100%', backgroundColor: '#F6F7FB', }} />
      <Box className={styles.noticebackground2} sx={{ width: 1496, height: 906, backgroundColor: 'white', }} />
      
      <div className={styles.noticetitle}>공지사항</div>


      <Button className={styles.writetbutton} variant="contained" onClick={handleOpen}>작성하기</Button>

      <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
          <Button className={styles.addclosebutton} variant="text" onClick={handleClose}>X</Button>

            <Typography className={styles.addnoticetitle}>공지사항</Typography>
            <Typography className={styles.addnoticesubtitle}>공지사항을 작성해주세요.</Typography>
            <Divider className={styles.modaldivider} orientation="horizontal" variant="fullWidth" flexItem />

            <div className={styles.addnoticeoption1}>제목</div>
            <TextField className={styles.noticeinfo1} sx={{ minWidth: 570 }} id="outlined-basic" label="제목을 입력해주세요." variant="outlined"/>            

            <div className={styles.addnoticeoption2}>내용</div>
            <TextField className={styles.noticeinfo2} sx={{ minWidth: 570 }} multiline rows={5} id="outlined-basic" label="공지사항 내용을 입력해주세요." variant="outlined"/>            

            <div className={styles.addnoticeoption3}>첨부자료</div>
            <TextField className={styles.noticeinfo3} sx={{ minWidth: 510 }} id="outlined-basic" label="공연의 포스터, 공연 관련 이미지를 추가해주세요." variant="outlined"/>
            <Box className={styles.filebackground} sx={{ width: 48, height: 48, backgroundColor: '#F2F2F2', borderRadius: '6px' }} />
            <label htmlFor="icon-button-file" className={styles.fileuploadbutton}>
              <IconButton color="inherit" component="span" backgroundColor="#F2F2F2">
                <AttachFileIcon />
              </IconButton>
            </label>
            
        
            <Button className={styles.addcreatebutton} variant="contained">만들기</Button>

          </Box>
        </Modal>




        {/* <Box className={styles.showbackground} sx={{ width: 1365, height: '100%', backgroundColor: '#F6F7FB', }} />
        <div className={styles.showsubtitle}>협업 공연</div>

        <Button className={styles.addconcertbutton} variant="contained" onClick={handleOpen}>+ 새로운 공연 추가</Button>

        <div className={styles.searchconcert}>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="공연 검색" inputProps={{ 'aria-label': 'search google maps' }} />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"> <SearchIcon /> </IconButton>
          </Paper>
        </div>



        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
          <Button className={styles.addclosebutton} variant="text" onClick={handleClose}>X</Button>

            <Typography className={styles.addshowtitle}>새로운 공연</Typography>
            <Typography className={styles.addshowsubtitle}>기획중인 공연에 대해 간략하게 작성해주세요.</Typography>
            <Divider className={styles.modaldivider} orientation="horizontal" variant="fullWidth" flexItem />

            <div className={styles.addshowoption1}>장르</div>
            <FormControl className={styles.showinfo1} sx={{ minWidth: 130 }}>
              <InputLabel id="demo-simple-select-label">장르선택</InputLabel>
              <Select
                value={info}
                label="info"
                displayEmpty
                onChange={handleChange}
              >
                <MenuItem value={1}>뮤지컬</MenuItem>
                <MenuItem value={2}>무용</MenuItem>
                <MenuItem value={3}>연극</MenuItem>
                <MenuItem value={3}>음악</MenuItem>
                <MenuItem value={3}>SHOW</MenuItem>
                <MenuItem value={3}>기타 예술 공연</MenuItem>
              </Select>
            </FormControl>

            <div className={styles.addshowoption2}>공연명</div>
            <TextField className={styles.showinfo2} sx={{ minWidth: 570 }} id="outlined-basic" label="공연 이름을 입력해주세요." variant="outlined"/>
            <FormControlLabel className={styles.checkoption} control={<Checkbox defaultChecked />} label="가제목입니다." />
    
            <div className={styles.addshowoption3}>공연예상일자</div>

            <div className={styles.addshowoption3_1}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="공연 시작일"
                value={startDate}
                onChange={ (newValue) => {setStartDate(newValue);}}
                renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className={styles.addshowoption3_2}>~</div>

            <div className={styles.addshowoption3_3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="공연 종료일"
                value={endDate}
                onChange={ (newValue) => {setEndDate(newValue);}}
                renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            

            <div className={styles.addshowoption4}>대표 이미지</div>
            <TextField className={styles.showinfo4} sx={{ minWidth: 510 }} id="outlined-basic" label="공연의 포스터, 공연 관련 이미지를 추가해주세요." variant="outlined"/>
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



        <div className={styles.showorder1}>최근 생성순</div>
        <div className={styles.showorder2}>모든상태</div> */}
    </>
  );
}

export default Notice;