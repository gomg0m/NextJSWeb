import React from 'react';
import Header from '../src/fix/Header';
import styles from '../src/css/Preproduction1.module.css';
import { Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Input, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Footer from "../src/fix/Footer";
import Leftside from '../src/fix/Leftside';
import Rightside from '../src/fix/Rightside';
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


function Preproduction1() {
  
  return (
    <>
      <Header />
      <Leftside />
      <Rightside />
        <Box className={styles.prebackground1} sx={{ width: 1026, height: '100%', backgroundColor: '#F6F7FB', }} />
        <div className={styles.presubtitle1}>희망연출정보</div>

        <Button className={styles.addinfobutton1} variant="contained">+ 새로운 연출정보 추가</Button>

        <div className={styles.order1}>최근 생성순</div>
        <div className={styles.order2}>모든상태</div>
      <Footer />
    </>
  );
}

export default Preproduction1;