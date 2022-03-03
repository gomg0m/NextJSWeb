import React, { useState,useEffect, useContext } from 'react';
import Leftside from '../src/fix/Leftside2(2)';
import Header from '../src/fix/Header';
import styles from '../src/css/TechDashboard.module.css';
import { Box, Button, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Input, IconButton } from '@mui/material';
import Axios from 'axios';
import Router from "next/router";
import NewTechProject from "./NewTechProject";
import {Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material';
import cardsty from "../src/css/card2.module.css";

import AppContext from "../src/component/AppContext";

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
export default function PostDashboard() {
  //상태버튼
  const [techInfoState, setTechInfoState] = useState("협의대기");

  // Modal Open/Close
  const [open, setOpen] = React.useState(false);
  const [postListIN, setPostListIN] = useState([]);
  const [postListOUT, setPostListOUT] = useState([]);
  const [postListETC, setPostListETC] = useState([]);

  const globalPlanID = useContext(AppContext);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function UpdatePostInfo(){
    Axios.get("/api/getPostInfo").then((res) =>{
      if(res.status == 200){
        //login 성공
        console.log(res.data.users);
        let postlistIN=[];
        let postlistOUT=[];
        let postlistETC=[];

        res.data.users.map((item)=>{
          if(item.post_type === '반입'){
            postlistIN.push({firstimage:item.post_firstimage, lasttime:item.post_lasttime, discussname:item.post_discussname, id:item.post_id, hope:item.post_hope});
          }
          if(item.post_type === '반출'){
            postlistOUT.push({firstimage:item.post_firstimage, lasttime:item.post_lasttime, discussname:item.post_discussname, id:item.post_id, hope:item.post_hope});
            }
          if(item.post_type === '기타'){
            postlistETC.push({firstimage:item.post_firstimage, lasttime:item.post_lasttime, discussname:item.post_discussname, id:item.post_id, hope:item.post_hope});
            }
        });
        setPostListIN(postlistIN);       
        setPostListOUT(postlistOUT);       
        setPostListETC(postlistETC); 
        console.log('k',postlistIN);
        console.log('k',postlistOUT);
        console.log('k',postlistETC);
    }//if
  });
}//if status      

// USEEFFECT! 페이지 진입 초기화 ===========================================================
useEffect(()=>{UpdatePostInfo();},[]);
//=========================================================================================

const btnHandler=()=>{console.log('btn clickted')};

//카드 누르면 해당 페이지로 이동
const cardHandler=(e)=>{
  let routeTarget = "/Panels/PostInfo/"+ e.currentTarget.id;
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
  Axios.post("/api/insertPostInfo", {diglogdata}).then((res)=>{
    if(res.status == 200){
        //login 성공
        console.log(res.data.users);
        //대쉬보드 업데이트를 위해서 다시한번 정보가져와서 카드list 리랜더링
        UpdatePostInfo();
    }
  });//end of Axio
}//==============새로운 기술협의 추가 모달 띄우기 완료==================//

  
  return (
    <>
      <Header />
      <Leftside />
      <div> 
        <Box  className={styles.prebackground} sx={{ width: 1550, height: '150%', backgroundColor: '#F6F7FB'}}>
          <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontSize:'20px', fontWeight:'700'}}> 후속처리 공간 </div>
            <div style={{marginLeft:'100px'}}><Button variant="contained" onClick={handleOpen}>+ 새로운 후속처리 관련 협의 추가</Button></div>
          </div>

          <NewTechProject style={{margin:"0px 30px 0px"}} open={open} close={handleClose} getdialogdata={handleDialogData}/>

          <div style={{fontSize:'18px', fontWeight:'600', marginLeft:'50px', marginTop:'50px'}}>반입</div>
          {/* =========카드 나오기========== */}
          <div style= {{ display:'flex', flexDirection:'row', marginLeft:'50px', marginTop:'20px', overflow:"auto", width:"1470px", height:"350px"}} >
            { 
              postListIN.map((item)=>(
                <Card className={cardsty.card_item} sx={{ minWidth: 356, minHeight: 300}} >
                  <CardActionArea>
                    <CardActions>
                      <CardMedia
                        component="img"
                        height="150"
                        image={'/uploads/'+item.firstimage}
                        onClick={cardHandler}
                        id={item.id}
                      />
                    </CardActions>
                  </CardActionArea>

                  <CardContent>
                    <Typography className={cardsty.title} component="div">
                      {item.discussname}
                    </Typography>
                    <Typography className={cardsty.subtitle} component="div">
                      {item.hope}
                    </Typography>
                    <Button className={styles.discbutton}>협의 진행하기</Button>
                  </CardContent> 
                </Card>
              )) 
            }
          </div>

          <div style={{fontSize:'18px', fontWeight:'600', marginLeft:'50px', marginTop:'0px'}}>반출</div>
          {/* =========카드 나오기========== */}
          <div style= {{ display:'flex', flexDirection:'row', marginLeft:'50px', marginTop:'20px', overflow:"auto", width:"1470px", height:"350px"}} >
            { 
              postListOUT.map((item)=>(
                <Card className={cardsty.card_item} sx={{ minWidth: 356, minHeight: 300}} >
                  <CardActionArea>
                    <CardActions>
                      <CardMedia
                        component="img"
                        height="150"
                        image={'/uploads/'+item.firstimage}
                        onClick={cardHandler}
                        id={item.id}
                      />
                    </CardActions>
                  </CardActionArea>

                  <CardContent>
                    <Typography className={cardsty.title} component="div">
                      {item.discussname}
                    </Typography>
                    <Typography className={cardsty.subtitle} component="div">
                      {item.hope}
                    </Typography>
                    <Button className={styles.discbutton}>협의 진행하기</Button>
                  </CardContent> 
                </Card>
              )) 
            }
          </div>

          <div style={{fontSize:'18px', fontWeight:'600', marginLeft:'50px', marginTop:'0px'}}>기타</div>
          {/* =========카드 나오기========== */}
          <div style= {{ display:'flex', flexDirection:'row', marginLeft:'50px', marginTop:'20px', overflow:"auto", width:"1470px", height:"350px"}} >
            { 
              postListETC.map((item)=>(
                <Card className={cardsty.card_item} sx={{ minWidth: 356, minHeight: 300}} >
                  <CardActionArea>
                    <CardActions>
                      <CardMedia
                        component="img"
                        height="150"
                        image={'/uploads/'+item.firstimage}
                        onClick={cardHandler}
                        id={item.id}
                      />
                    </CardActions>
                  </CardActionArea>

                  <CardContent>
                    <Typography className={cardsty.title} component="div">
                      {item.discussname}
                    </Typography>
                    <Typography className={cardsty.subtitle} component="div">
                      {item.hope}
                    </Typography>
                    <Button className={styles.discbutton}>협의 진행하기</Button>
                  </CardContent> 
                </Card>
              )) 
            }
          </div>


        </Box>       
      </div>
    </>
  );
}