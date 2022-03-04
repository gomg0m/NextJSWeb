import React, { useState,useEffect, useContext } from 'react';
import Leftside from '../src/fix/Leftside2(2)';
import Header from '../src/fix/Header';
import styles from '../src/css/TechDashboard.module.css';
import { Box, Button, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Input, IconButton } from '@mui/material';
import Axios from 'axios';
import Router from "next/router";
import NewPostProject from "../src/component/popupPostWrite";
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

interface IDialogueNewProject {
  prj_name: string,
  prj_contents: string,
  prj_firstimage: string
  prj_lasttime: string, 
  prj_type: string,
}

/////=========== Dashboard 메인 페이지 ============================/////
export default function PostDashboard() {
  //상태버튼
  const [techInfoState, setTechInfoState] = useState("협의대기");

  // Modal Open/Close
  const [list, setList] = useState([]);
  const [postListIN, setPostListIN] = useState([]);  //POSTINFO 테이블 값을 읽어 저장할 View관련 State변수
  const [postListOUT, setPostListOUT] = useState([]); // post_type(반입/반출/기타)에 따라 state 변수 분리
  const [postListETC, setPostListETC] = useState([]);

  const [open, setOpen] = useState(false);    //협의 작성을 위한 Modal 창 열기/닫기용 state 변수
  
  const [postids, setPostIDs] = useState([])    //postids: PLANINFO 테이블의 plan_ids값을 배열로 저장

  const gValue = useContext(AppContext);      //현재 사용자가 입장되어 있는 공연 프로젝트 ID를 전역변수로 관리

  const handleOpen = () => setOpen(true);     //후속처리 Modal 창 이벤트 핸들러
  const handleClose = () => setOpen(false);   //후속처리 Modal 창 이벤트 핸들러

  
  //---------현재 공연 PLANINFO 테이블에서 후속처리와 관련된 ids 불러와 State변수(배열)에 저장 ------------------------
  const getPlanPostIDs = async (id) => {    
    
    try{
      const response = await Axios.post("/api/getPlanInfo", {id} );
      let ids = [];
      ids = JSON.parse(response.data.users[0].plan_postids); 
      setPostIDs(ids);
      return ids;

    } catch(error){
      console.log("Error >>", error);
    }
    
  } 
  //---------------------------------------------------------------------------------------------------------------


  //------------------- POSTINFO 테이블에서 후속처리 관련 id들을 읽어 State변수 갱신 ---------------------------------
  const updatePostInfo = async(ids)=>{        
    //1. post(global palnId)=> getPlanInfo 
    //2. plan_posttids parsing
    //3. post(postids) => getPostIds
    //4. setListIN/OUT/ETC
    try{
      const res = await Axios.post("/api/getPostInfoids", {ids});
      //login 성공
      console.log(res.data.users);
      let postlistIN=[];
      let postlistOUT=[];
      let postlistETC=[];
      
      //post_type(반입/반출/기타)에 따른 해당 State변수로 분리 저장
      res.data.users.map((item)=>{
        if(item.post_type == '반입'){ postlistIN.push({firstimage:item.post_firstimage, lasttime:item.post_lasttime, discussname:item.post_discussname, id:item.post_id, hope:item.post_hope});}
        if(item.post_type == '반출'){ postlistOUT.push({firstimage:item.post_firstimage, lasttime:item.post_lasttime, discussname:item.post_discussname, id:item.post_id, hope:item.post_hope});}
        if(item.post_type == '기타'){ postlistETC.push({firstimage:item.post_firstimage, lasttime:item.post_lasttime, discussname:item.post_discussname, id:item.post_id, hope:item.post_hope});}
      }); //map
      setPostListIN(postlistIN);       
      setPostListOUT(postlistOUT);       
      setPostListETC(postlistETC); 
      console.log('ALL', res.data.users);
      console.log('IN',postListIN);
      console.log('OUT',postListOUT);
    }catch(error){
      console.log("Error >>", error);      
    }
  }
  //---------------------------------------------------------------------------------------------------------------------


  //------------------- 작성된 후속처리 협의를 POSTINFO에 추가하고 관련사항 PLANINFO 갱신 -----------------------------------
  const createPostInfo = async(dialogdata:IDialogueNewProject) => { 
    //1. returned dialogdata => insertProductInfo : post_type, post_disccussname, post_hope, post_firstimage, post_lasttime
    //2. updateProductInfo() <-- get last product_id;inserted product_id 
    //3. post(inserted product_id) => updatePlaninfoProductids : plan_productids    
    try {
      dialogdata.prj_lasttime = String(new Date());  
      //1. insert product info.
      const resInsertProduct = await Axios.post("/api/insertPostInfo", {dialogdata});  //1. 작성 내용 후속처리테이블에 삽입
      //2. get last index
      const resGetProduct = await Axios.get("/api/getPostInfo");  //2. 삽입된 후속처리테이블 다시읽어 들이고
      let newids = [...postids, String(resGetProduct.data.users[resGetProduct.data.users.length-1].post_id)]; //3.삽입된 id를 ids에 추가하고
      setPostIDs(newids);
      const resProductID = await updatePostInfo(newids);  //4. 추가된 ids로 후속테이블을 다시읽어들이고
      let snewids = JSON.stringify(newids);   //5. PLANINFO 테이블의 해당 id의 post_ids 갱신을 위해 JSON형식으로 바꾸고
      let data = {plan_id:gValue.state.planID, plan_productids:snewids};
      const resUpdatePlanids = await Axios.post("/api/updatePlaninfoPostids", {data}); //6.PLANINFO의 해당 plan_id와 JSON ids를 넘겨 PLANINFO 갱신   
    }catch(error){
      console.log("Error >>", error); 
    }
  }
  //---------------------------------------------------------------------------------------------------------------------

  // USEEFFECT! 페이지 진입 초기화 ===========================================================
  useEffect(()=>{  
    getPlanPostIDs(gValue.state.planID).then((result)=>{    
      updatePostInfo(result);
    });
  },[]);
  //=========================================================================================



  const btnHandler=()=>{console.log('btn clickted')};

  //-----------------------------후속처리 카드 클릭 이벤트 핸들러 : 해당 후속처리 판넬 페이지로 이동 -------------------------
  const cardHandler=(e)=>{
    let routeTarget = "/Panels/PostInfo/"+ e.currentTarget.id;
    Router.push(routeTarget);
  };
  //---------------------------------------------------------------------------------------------------------------------


  function handleDialogData(diglogdata:IDialogueNewProject){  //----------------------- popupModal 처리 -------------
    createPostInfo(diglogdata);
  } //-------------------------------------------------------------------------------------------------------------------

  
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

          <NewPostProject style={{margin:"0px 30px 0px"}} open={open} close={handleClose} getdialogdata={handleDialogData}/>

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