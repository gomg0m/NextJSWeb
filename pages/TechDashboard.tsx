import React, { useState,useEffect, useCallback } from 'react';
import Leftside from '../src/fix/Leftside2(2)';
import Header from '../src/fix/Header';
import styles from '../src/css/TechDashboard.module.css';
import { Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Input, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Axios from 'axios';
import Router from "next/router";
import NewTechProject from "./NewTechProject";
import {Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material';
import cardsty from "../src/css/card.module.css"

//모달 디자인
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


/////=========== Dashboard 메인 페이지 ============================/////
export default function TechDashboard() {

  // Modal Open/Close
  const [list, setList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function getData(){
    Axios.get("/api/getTechInfo").then((res) =>{
      console.log("projects get data",res.data.users);
      setList(res.data.users);
  });
}

useEffect(()=>{getData();},[]);

const btnHandler=()=>{console.log('btn clickted')};

//카드 누르면 해당 페이지로 이동
const cardHandler=(e)=>{
  console.log("e",e.target.attributes[3].value)
  let routeTarget = "/Panels/TechInfo/"+ e.target.attributes[3].value;
  console.log("id", routeTarget);
  Router.push(routeTarget);
};

//==============새로운 기술협의 추가 모달 띄우기 시작==================//
interface IDialogueNewProject {
  prj_name: string,
  prj_contents: string,
  prj_firstimage: string
}

function handleDialogData(diglogdata:IDialogueNewProject){
  console.log('handleDialogData',diglogdata);
  Axios.post("/api/insertTechInfo", {diglogdata}).then((res)=>{
    if(res.status == 200){
        //login 성공
        console.log(res.data.users);
        //대쉬보드 업데이트를 위해서 다시한번 정보가져와서 카드list 리랜더링
        Axios.get("/api/getTechInfo").then((res)=>{
            if(res.status == 200){
                //login 성공
                setList(res.data.users);
            }
        });
    }
  });//end of Axio
}
//==============새로운 기술협의 추가 모달 띄우기 완료==================//
  
  return (
    <>
      <Header />
      <Leftside />

      <div> 
        <Box className={styles.prebackground} sx={{ width: 1560, height: '150%', backgroundColor: '#F6F7FB', }} />
        <div className={styles.presubtitle}>기술구체화협의</div>

        <Button className={styles.addmeetingbutton} variant="contained" onClick={handleOpen}>+ 새로운 기술구체화협의 추가</Button>
        <NewTechProject style={{margin:"0px 30px 0px"}} open={open} close={handleClose} getdialogdata={handleDialogData}/>

        <div className={styles.order1}>최근 생성순</div>
        <div className={styles.order2}>모든상태</div>

        {/* =========카드 나오기========== */}
        <div className={cardsty.card_container} style= {{ position:"absolute", top:"300px", overflow:"auto", width:"1310px", height:"450px"}} >
          { 
            list.map((item)=>(
              <Card className={cardsty.card_item} sx={{ minWidth: 345, minHeight: 350}} >
                
                <CardActionArea>
                  <CardActions>
                    <CardMedia
                      component="img"
                      height="150"
                      image={'/uploads/'+item.tech_firstimage}
                      onClick={cardHandler}
                      id={item.tech_id}
                    />
                  </CardActions>
                </CardActionArea>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.tech_discussname} 기술구체화협의
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.tech_hope}
                  </Typography>
                </CardContent> 

                <CardActions>
                  <Button size="small" color="primary" onClick={btnHandler}>
                    Share
                  </Button>
                </CardActions> 

              </Card>
            )) 
          }
        </div>

       

      </div>
    </>
  );
}