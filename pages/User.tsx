import { useForm } from "react-hook-form";
import Router from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Axios from "axios";
import styles from '../src/css/HomeHeader.module.css';
import Home from '../pages/Home';
import { Box, Button, Divider, Modal, Typography, TextField } from '@mui/material';
import { FormInputText } from "../src/component/FormInputText";
import { FormInputMultilineText } from "../src/component/FormInputMultilineText";

interface IFormInput {
    user_id: string;
    user_name: string;
    user_company: string;
    user_email: string;
    user_password: string;
}

const defaultValues = {
    user_id: "",
    user_name: "",
    user_company:"",
    user_email: "",
    user_password: "",
};

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


/////=========== Home (회원가입) 페이지 메인 =====================================
export default function UserInfo() {
    // let boxprops ={ width:400, height:150};
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue } = methods;

    const onSubmit = (data: IFormInput) => {
        console.log("Form data", data);
        Axios.post("/api/getUserInfo", {data}).then((res)=>{
            if(res.status == 200){
                //login 성공
                console.log(res.data.users);
                Axios.get("/api/getUserInfo").then((res)=>{
                    if(res.status == 200){
                        //login 성공
                        console.log("last plan_id", res.data.users);
                        let routname = '/User/'+String(res.data.users[0].user_name);
                        Router.push(routname);
                        console.log("routing user_id", routname);
                    }
                });
            }
        });
    }

    // 회원가입창
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log('hello');
        setOpen(false);
    }

    // 로그인 창
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    return(
        <div>

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

             {/* <div className={sty.subtitle} style={{margin:"50px 0px 0px"}}>희망연출 기술</div>
             <div className={sty.layout_top_table} style={{margin:"20px 0px 0px"}}><ListViewTable tableContents={HopeInfoTable}/></div> */}


            <Modal
                open={open}
                onClose={handleClose}
                >
            <Box sx={style}>
                <Typography className={styles.jointitle}>회원가입</Typography>
                <Divider className={styles.modaldivider} orientation="horizontal" variant="fullWidth" flexItem />

                <div className={styles.joinoption1}>이름</div>
                <FormInputText name="user_name" style={{width:"100px", margin:"20px 0px 0px"}} control={control} label="이름을 입력하세요."/>

                <div className={styles.joinoption2}>소속회사</div>
                <FormInputText name="user_company" style={{margin:"20px 0px 0px"}} control={control} label="소속회사를 입력하세요."/>

                <div className={styles.joinoption3}>이메일</div>
                <FormInputText name="user_email" style={{margin:"20px 0px 0px"}} control={control} label="이메일을 입력하세요."/>

                <div className={styles.joinoption4}>비밀번호</div>
                <FormInputText name="user_password" style={{margin:"20px 0px 0px"}} control={control} label="비밀번호를 입력하세요."/>
                <Button className={styles.canclebutton} variant="inherit" onClick={handleClose}>취소하기</Button>
                <Button className={styles.joinbutton} variant="contained" onClick={handleSubmit(onSubmit)}>가입하기</Button>
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
            <Home />
        </div>
    );
};

