import styles from '../css/HomeHeader.module.css';
import Link from 'next/link';
import React from 'react';
import { Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Input, IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 570,
  bgcolor: 'background.paper',
  border: '1px solid #E0E0E0',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 450,
  bgcolor: 'background.paper',
  border: '1px solid #E0E0E0',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function HomeHeader() {

  // 회원가입창
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 로그인 창
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  return (
    <div className={styles.headerbox}>
      <div className={styles.logocontainer}>
        <div className={styles.logo} > <img src="images/kitechlogo.svg" alt="logo" width='100px'/></div>
        <div className={styles.logotext}>첨단융합공연 지식기반정보플랫폼</div>             
      </div>

      <div className={styles.headercontainer}>
        <Button className={styles.menubutton} variant='text'>소개</Button>
        <Button className={styles.menubutton} variant='text'>공연DB</Button>
        <Button className={styles.menubutton} variant='text'>공지사항</Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button className={styles.menubutton} variant='text' onClick={handleOpen}>회원가입</Button>

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Typography className={styles.jointitle}>회원가입</Typography>
            <Divider className={styles.modaldivider} orientation="horizontal" variant="fullWidth" flexItem />

            <div className={styles.joinoption1}>이름</div>
            <TextField className={styles.info1} sx={{ minWidth: 250 }} id="outlined-basic" label="이름을 입력해주세요." variant="outlined"/>

            <div className={styles.joinoption2}>소속회사</div>
            <TextField className={styles.info2} sx={{ minWidth: 250 }} id="outlined-basic" label="소속회사를 입력해주세요." variant="outlined"/>

            <div className={styles.joinoption3}>이메일</div>
            <TextField className={styles.info3} sx={{ minWidth: 250 }} id="outlined-basic" label="이메일을 입력해주세요." variant="outlined"/>
            
            <div className={styles.joinoption4}>비밀번호</div>
            <TextField className={styles.info4} sx={{ minWidth: 250 }} id="outlined-basic" label="비밀번호를 입력해주세요." variant="outlined"/>

            <Button className={styles.canclebutton} variant="inherit" onClick={handleClose}>취소하기</Button>
            <Button className={styles.joinbutton} variant="contained">가입하기</Button>
          </Box>
        </Modal>

          <Button className={styles.loginbutton} variant='contained' color='primary' onClick={handleOpen2}>로그인</Button>

          <Modal
          open={open2}
          onClose={handleClose2}
        >
          <Box sx={style2}>
            <div className={styles.loginlogo} > <img src="images/kitechlogo.svg" alt="logo" width='150px'/></div>
            <Typography className={styles.jointitle2}>첨단융합공연 지식기반정보플랫폼</Typography>
            <Divider className={styles.modaldivider2} orientation="horizontal" variant="fullWidth" flexItem />

            <div className={styles.loginoption1}>이메일</div>
            <TextField className={styles.logininfo1} sx={{ minWidth: 250 }} id="outlined-basic" label="이메일을 입력해주세요." variant="outlined"/>

            <div className={styles.loginoption2}>비밀번호</div>
            <TextField className={styles.logininfo2} sx={{ minWidth: 250 }} id="outlined-basic" label="비밀번호를 입력해주세요." variant="outlined"/>

            <Button className={styles.loginbutton2} variant="contained">로그인</Button>
          </Box>
        </Modal>

      </div>
    </div>
  );
}
