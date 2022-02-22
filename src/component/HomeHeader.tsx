import styles from '../css/HomeHeader.module.css';
import Link from 'next/link';
import React from 'react';
import { Box, Button, Divider, Modal, Typography, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import Router from 'next/router';
import { FormInputText } from "./FormInputText";
import { FormInputDropdown } from './FormInputDropdown2';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 570,
  bgcolor: 'background.paper',
  border: '1px solid #E0E0E0',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface IFormInput {
  user_id: string;
  user_name: string;
  user_company: string;
  user_team: string;
  user_email: string;
  user_password: string;
  user_created: string;
};
  
const defaultValues = {
  user_id: "",
  user_name: "",
  user_company:"",
  user_team: "",
  user_email: "",
  user_password: "",
  user_created: ""
};


export default function HomeHeader() {

  // 회원가입창
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 미완료 -----------------------------------------------------
  const methods = useForm({ defaultValues: defaultValues });

  const { handleSubmit, reset, control, setValue } = methods;
  
  const onSubmit = (data: IFormInput) => {
        console.log(data);
        Axios.post("/api/postUserInfo", {data}).then((res)=>{
            if(res.status == 200){
                Router.push("/Home")
            }
        });
    }


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
            <div className={styles.info1} style={{width:"250px"}}><FormInputText name="user_name" control={control} label="이름을 입력해주세요."/></div>
            {/* <TextField className={styles.info1} sx={{ minWidth: 250 }} id="outlined-basic" label="이름을 입력해주세요." variant="outlined"/> */}

            <div className={styles.joinoption2}>소속회사</div>
            <div className={styles.info2} style={{width:"250px"}}><FormInputText name="user_company" control={control} label="소속회사를 입력해주세요."/></div>
            {/* <TextField className={styles.info2} sx={{ minWidth: 250 }} id="outlined-basic" label="소속회사를 입력해주세요." variant="outlined"/> */}

            <div className={styles.joinoption3}>소속팀</div>
            <div className={styles.info3} style={{width:"250px"}}><FormInputDropdown name="user_team" control={control} label="소속팀을 선택해주세요."/></div>
            {/* <FormControl className={styles.info3} sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="team-label">소속팀을 선택해주세요.</InputLabel>
              <Select labelId="team-select-label" id="team-select" value={team} label="Team" onChange={handleChange}>
                <MenuItem value={10}>기술팀</MenuItem>
                <MenuItem value={20}>기획팀</MenuItem>
                <MenuItem value={30}>디자인팀</MenuItem>
                <MenuItem value={40}>무대팀</MenuItem>
                <MenuItem value={50}>연출팀</MenuItem>
              </Select>
            </FormControl> */}

            <div className={styles.joinoption4}>이메일</div>
            <div className={styles.info4} style={{width:"250px"}}><FormInputText name="user_email" control={control} label="이메일을 입력해주세요."/></div>
            {/* <TextField className={styles.info4} sx={{ minWidth: 250 }} id="outlined-basic" label="이메일을 입력해주세요." variant="outlined"/> */}
            
            <div className={styles.joinoption5}>비밀번호</div>
            <div className={styles.info5} style={{width:"250px"}}><FormInputText name="user_password" control={control} label="비밀번호를 입력해주세요."/></div>
            {/* <TextField className={styles.info5} sx={{ minWidth: 250 }} id="outlined-basic" type="password" label="비밀번호를 입력해주세요." variant="outlined"/> */}

            <Button className={styles.canclebutton} onClick={() => reset()}>취소하기</Button>
            <Button className={styles.joinbutton} variant="contained" onClick={handleSubmit(onSubmit)}>가입하기</Button>
          </Box>
        </Modal>

        <Link href="/Login">
          <Button className={styles.loginbutton} variant='contained' color='primary'>로그인</Button>
        </Link>
      </div>
    </div>
  );
}