import React, { useState,useEffect, useCallback, useMemo } from "react";
import Header from '../src/fix/Header';
import Rightside from "../src/fix/Rightside1";
import Link from 'next/link';
import Axios from 'axios';

import {Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material';
import cardsty from "../src/css/card.module.css"

import {FormInputDropdown} from '../src/component/FormInputDropdown'
import styles from '../src/css/Show.module.css';
import { Checkbox, FormControlLabel, Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, 
  FormControl, Select, TextField, Paper, InputBase, IconButton } from '@mui/material';
import Router from "next/router";
import SearchIcon from '@mui/icons-material/Search';
import DialogNewProject from "./DialogNewProject";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {makeStyles} from '@material-ui/core';

//global id 가져오기
import { useContext } from "react";
import AppContext from "../src/component/AppContext";
import { margin, width } from "@mui/system";
import {ComboStyles} from '../src/css/ComboStyles';

interface IFormInput {
  plan_id: string;
  plan_name: string;
  plan_genre: string;
  plan_start: string;
  plan_end: string;
  plan_image: string;
  plan_time: string;
  plan_number: string;
  plan_budget: string;
  goal_people: string;
  goal_price: string;
  plan_contents: string;
  plan_exception: string;
  plan_file: string;
  }
  
  const defaultValues = {
  plan_id: "",
  plan_name:"",
  plan_genre: "",
  plan_start: "",
  plan_end: "",
  plan_image:"",
  plan_time: "",
  plan_number: "",
  plan_budget: "",
  goal_people: "",
  goal_price: "",
  plan_contents: "",
  plan_exception: "",
  plan_file: "",
  
  };

function Combo(){
  const [age, setAge] = React.useState('');

  const classe = ComboStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return(
  <FormControl className={cardsty.Container}>
    
  <InputLabel className={classe.InputLabel} id="demo-simple-select-label">상태결정</InputLabel>
  <Select className={classe.ContainerMain}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem className={classe.MenuItem} value={10}>계획중</MenuItem>
    <MenuItem className={classe.MenuItem} value={20}>제작중</MenuItem>
    <MenuItem className={classe.MenuItem} value={30}>종료</MenuItem>
  </Select>
</FormControl>
);
}

 
/////TabPanel 관련 
const useStyles = makeStyles({
  customStyleOnTab:{
    fontFamily: "Noto Sans KR",
    fontSize:'22px',
    fontWeight: '500',
    color:'black',

  },

  customStyleOnActiveTab:{
    color:'red'
  },

  activeTab:{
    fontSize:'16px',
    color:'pink'
  },

  PanelText:{
    fontSize:'16px',
    color:'pink'
  }
})


TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.number.isRequired,
value: PropTypes.number.isRequired,
};

function TabPanel(props) {
const { children, value, index, ...other } = props;

return (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}      
    {...other} 
    
  >
    {value === index && (
      <Box sx={{ p: 3 }} >
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);
}

function a11yProps(index) {
return {
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
};
}
/////

var clickID=1;

/////=========== Dashboard 메인 페이지 ==========================////
export default function DashboardView(){ 

  const [list, setList] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = ()=> setOpen(false);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles(); /////?????
  const [tabValue, setTabValue] = React.useState(0);  ///TabPanel 관련

  const [planInfoState, setPlanInfoState] = useState("확인중");
  const [theaterInfoState, setTheaterInfoState] = useState("확인중");
  const [cardID, setCardID] = useState("");
  
  const [hopeList, setHopeList] = useState([]);
  const [techList, setTechList] = useState([]);
  const [hopeLastTime, setHopeLastTime] = useState([]);
  const [hopeName, setHopeName] = useState([]);
  const [techLastTime, setTechLastTime] = useState([]);
  const [techName, setTechName] = useState([]);
  const [hopeIds, setHopeIds] = useState([]);
  const [techIds, setTechIds] = useState([]);

  const [productList, setProductList] = useState([]);
  const [productLastTime, setProductLastTime] = useState([]);
  const [productName, setProductName] = useState([]);
  const [productIds, setProductIds] = useState([]);

  const [postListIN, setPostListIN] = useState([]);
  const [postLastTimeIN, setPostLastTimeIN] = useState([]);
  const [postNameIN, setPostNameIN] = useState([]);
  const [postListOUT, setPostListOUT] = useState([]);
  const [postLastTimeOUT, setPostLastTimeOUT] = useState([]);
  const [postNameOUT, setPostNameOUT] = useState([]);
  const [postListETC, setPostListETC] = useState([]);
  const [postLastTimeETC, setPostLastTimeETC] = useState([]);
  const [postNameETC, setPostNameETC] = useState([]);
  
  const [postIds, setPostIds] = useState([]);

  const [planname, setPlanname] = React.useState([]);

  //leftside에도 추가하기
  const globalPlanID = useContext(AppContext);

  var CardID:number;

  function getAllPlanInfo(){
      Axios.get("/api/getPlanInfo").then((res) =>{
        console.log("projects get data",res.data.users);
        setList(res.data.users);
    });
  }
  
  function getPlanName(id){
    Axios.post("/api/getPlanInfo", {id} ).then((res) => {
      if(res.status==200)
      { 
        console.log("공연이름", res.data.users);
        let name = [];
        res.data.users.map((item) => (
          name.push(item.plan_name)
        ))
        setPlanname(name);
      }
    })////////
}

function updateAboutTabState(id){
  Axios.post("/api/getPlanInfo", {id} ).then((res) => {
    if(res.status==200)
    {
      ////아래내용중 하나라도 값이 존재하면
      if(res.data.users[0].plan_number 
        || res.data.users[0].plan_budget
        || res.data.users[0].goal_people
        || res.data.users[0].goal_price
        || res.data.users[0].plan_contents
        || res.data.users[0].plan_exception) {
          if (res.data.users[0].plan_number 
            && res.data.users[0].plan_budget
            && res.data.users[0].goal_people
            && res.data.users[0].goal_price
            && res.data.users[0].plan_contents
            && res.data.users[0].plan_exception){
            setPlanInfoState("완료");
          }
            setPlanInfoState("진행중");
        }
        else{
          setPlanInfoState("+ 새로 생성");
        } //if && 
        Axios.post("/api/getPlanInfo", {id} ).then((res) => {
          if(res.status==200)
          {
            ////아래내용중 하나라도 값이 존재하면
            if(res.data.users[0].theater_place 
              || res.data.users[0].theater_seatnumer
              || res.data.users[0].theater_size
              || res.data.users[0].theater_drawing
              || res.data.users[0].theater_exterior
              || res.data.users[0].theater_interior
              || res.data.users[0].theater_stage
              || res.data.users[0].theater_exception) {
                if (res.data.users[0].theater_place
                  && res.data.users[0].theater_seatnumer
                  && res.data.users[0].theater_size
                  && res.data.users[0].theater_drawing
                  && res.data.users[0].theater_exterior
                  && res.data.users[0].theater_interior
                  && res.data.users[0].theater_stage
                  && res.data.users[0].theater_exception ){
                    setTheaterInfoState("완료");
                }
                setTheaterInfoState("진행중");
              }
              else{
                setTheaterInfoState("+ 새로 생성");
              } //if && 
              
          }//if rest.status end
        })//Axios.post end
    }//if rest.status end
  })//Axios.pos end
};//About function end

function updatePreproductionTabState(id){

  ////plane_id에 해당하는 PlanInfo Table 가져옴
  Axios.post("/api/getPlanInfo", {id} ).then((res) => {

    if(res.status==200)
    { 
      let parsedHopeList = JSON.parse(res.data.users[0].plan_hopeids);
      console.log('parsedHopeList',parsedHopeList);
      let ids =[...parsedHopeList];
      console.log('ids',ids)
      setHopeIds(ids);
      ////plane_hopelist에 해당하는 PlanInfo Table 가져옴
      Axios.post("/api/getHopeInfoids", {ids}).then((res)=>{
        if(res.status == 200){
            //login 성공
            console.log('데이터',res.data.users);
            let hopefirstimg=[];
            let hopelasttime=[];
            let hopename=[];
            res.data.users.map((item)=>{hopefirstimg.push(item.hope_firstimage)});
            res.data.users.map((item)=>{hopelasttime.push(item.hope_lasttime)});
            res.data.users.map((item)=>{hopename.push(item.hope_name)});
            console.log('hopeimagelist',hopefirstimg);
            console.log('hopelasttime',hopelasttime);
            console.log('hopename',hopename);
            console.log('호프리스트', hopefirstimg);
            setHopeList(hopefirstimg);
            setHopeLastTime(hopelasttime);
            setHopeName(hopename);
            let parsedTechList = [];
            let itemList = [];
            res.data.users.map((item)=>{
              itemList = JSON.parse(item.hope_techids);
              parsedTechList = [...parsedTechList,...itemList];                  
            });

            console.log('parsedTechList',parsedTechList);
            let ids =[...parsedTechList];
            console.log('ids',ids);
            setTechIds(ids);
            //대쉬보드 업데이트를 위해서 다시한번 정보가져와서 카드list 리랜더링
            Axios.post("/api/getTechInfoids", {ids}).then((res)=>{
                if(res.status == 200){
                    //login 성공
                    console.log(res.data.users);
                    let techfirstimg=[];
                    let techlasttime=[];
                    let techname=[];
                    res.data.users.map((item)=>{techfirstimg.push(item.tech_firstimage)});
                    res.data.users.map((item)=>{techlasttime.push(item.tech_lasttime)});
                    res.data.users.map((item)=>{techname.push(item.tech_discussname)});
                    console.log('techimagelist',techfirstimg);                      
                    console.log('techlasttime',techlasttime);
                    setTechList(techfirstimg);                        
                    setTechLastTime(techlasttime);
                    setTechName(techname);
                }//if
            });
        }//if status
      });//end of Axio                  
    }
  });//end of Axio  
}


  function updateProductionTabState(id){
  ////plane_id에 해당하는 PlanInfo Table 가져옴
  Axios.post("/api/getPlanInfo", {id} ).then((res) => {

    if(res.status==200)
    { 
      let parsedProductList = JSON.parse(res.data.users[0].plan_productids);
      ////PlanInfo관련된 ProductInfo Table 가져옴
      console.log('parsedProductList',parsedProductList);
      let ids =[...parsedProductList];
      console.log('ids',ids);
      setProductIds(ids);
      Axios.post("/api/getProductInfoids", {ids}).then((res)=>{
          if(res.status == 200){
              //login 성공
              console.log(res.data.users);
              let firstimg=[];
              let lasttime=[];
              let productname=[];
              res.data.users.map((item)=>{firstimg.push(item.product_firstimage)});
              res.data.users.map((item)=>{lasttime.push(item.product_lasttime)});
              res.data.users.map((item)=>{productname.push(item.product_discussname)});
              console.log('productimagelist',firstimg);                      
              console.log('productlasttime',lasttime);
              setProductList(firstimg);                        
              setProductLastTime(lasttime);
              setProductName(productname);
          }//if
      }); //end of Axio
    }
  });//end of Axio     

}


  function updatePostProductionTabState(id){
  ////plane_id에 해당하는 PlanInfo Table 가져옴
  Axios.post("/api/getPlanInfo", {id} ).then((res) => {

    if(res.status==200)
    { 
      let parsedPostList = JSON.parse(res.data.users[0].plan_postids);
      console.log('parsedPostList',parsedPostList);
      let ids =[...parsedPostList];
      console.log('ids',ids);
      setPostIds(ids);
      //PlanInfo와 관련된 PostInfo 값 가져옴.
      Axios.post("/api/getPostInfoids", {ids}).then((res)=>{
          if(res.status == 200){
              //login 성공
              console.log(res.data.users);
              let firstimgIN=[];
              let lasttimeIN=[];
              let postnameIN=[];
              let firstimgOUT=[];
              let lasttimeOUT=[];
              let postnameOUT=[];
              let firstimgETC=[];
              let lasttimeETC=[];
              let postnameETC=[];                                    
              res.data.users.map((item)=>{
                if(item.post_type === '반입'){
                  firstimgIN.push(item.post_firstimage);
                  lasttimeIN.push(item.post_lasttime);
                  postnameIN.push(item.post_discussname);
                }
                if(item.post_type === '반출'){
                  firstimgOUT.push(item.post_firstimage);
                  lasttimeOUT.push(item.post_lasttime);
                  postnameOUT.push(item.post_discussname);
                  }
                if(item.post_type === '기타'){
                  firstimgETC.push(item.post_firstimage);
                  lasttimeETC.push(item.post_lasttime);
                  postnameETC.push(item.post_discussname);
                  }
              });
              setPostListIN(firstimgIN);       
              setPostLastTimeIN(lasttimeIN);
              setPostNameIN(postnameIN);
              setPostListOUT(firstimgOUT);       
              setPostLastTimeOUT(lasttimeOUT);
              setPostNameOUT(postnameOUT);
              setPostListETC(firstimgETC);       
              setPostLastTimeETC(lasttimeETC);
              setPostNameETC(postnameETC);
          }//if
        });
      }//if status
  });//end of Axio                            
}

  // USEEFFECT! =============================================================================
  useEffect(()=>{getAllPlanInfo();},[]);
  //=========================================================================================

  const btnHandler=()=>{console.log('btn clickted')};
  
  
  const cardHandler=(e)=>{  /////------------------------ Card Image Click시 핸들러 -------------
    
    setCardID(e.currentTarget.id);    //선택한 공연카드의 PlanID를 상태변수 cardID에 저장
    globalPlanID.statefunc(e.currentTarget.id); //선택한 공연카드의 PlanID를 전역변수 globalPlanID에 저장    
    getPlanName(e.currentTarget.id); //공연정보이름 가져오기 
    updateAboutTabState(e.currentTarget.id);           //*** ABOUT Tab과 관련된 정보 가져오기 및 상태변수 update    
    updatePreproductionTabState(e.currentTarget.id);   //*** PRE-PRODUCTION Tab과 관련된 정보 가져오기 및 상태변수 update           
    updateProductionTabState(e.currentTarget.id);      ///*** PRODUCTION Tab과 관련된 정보 가져오기 및 상태변수 update  
    updatePostProductionTabState(e.currentTarget.id);  ///*** POST-PRODUCTION Tab 과 관련된 정보 가져오기 및 상태변수 update      
  }//////---------------------------------------------------------------------------------------



const handleTabChange = (event, newValue) => {    ////------- Tab Click Event 시 핸들러 ---------
    setTabValue(newValue);
}; ////-------------------------------------------------------------------------------------------

  
  interface IDialogueNewProject {
    prj_genre: string,
    prj_name: string,
    prj_start: string,
    prj_end: string,
    prj_firstimage: string
  }

  function handleDialogData(diglogdata:IDialogueNewProject){ //-----------Dialogue 핸들러 ---------
    console.log('handleDialogData',diglogdata);
    Axios.post("/api/insertPlanInfo", {diglogdata}).then((res)=>{
      if(res.status == 200){
          //login 성공
          console.log(res.data.users);
          //대쉬보드 업데이트를 위해서 다시한번 정보가져와서 카드list 리랜더링
          Axios.get("/api/getPlanInfo").then((res)=>{
              if(res.status == 200){
                  //login 성공
                  setList(res.data.users);
              }
          });
      }
    });//end of Axio
  } ////-------------------------------------------------------------------------------------------


  const onTheaterBtnClick= ()=>{  //-----------------------------
    if (theaterInfoState=="진행중"){
        Router.push('/Panels/TheaterInfo'+String(cardID));
    }
    if (theaterInfoState=="완료"){
        Router.push('/Panels/TheaterInfo'+String(cardID));
    }
    if (theaterInfoState=="+ 새로 생성"){
      Router.push('TheaterInfoWrite');
    }

  }////-------------------------------------------------------------------------------------------
   
  const onPlanBtnClick= ()=>{ ////-----------------------------------------------------------------
    if (planInfoState=="진행중"){
      Router.push('/Panels/PlanInfo/'+String(cardID));
    }
    if (planInfoState=="완료"){
      Router.push('/Panels/PlanInfo/'+String(cardID));
    }
    if (planInfoState=="+ 새로 생성"){
      Router.push('PlanInfoWrite');
    }
  }////-------------------------------------------------------------------------------------------

  const onHopeBtnClick = (e)=>{////-----------------------------------------------------------------
    console.log('clickid', e.currentTarget.id);

    Router.push('/Panels/HopeInfo/'+String(e.currentTarget.id));
  }////-------------------------------------------------------------------------------------------

  const onTechBtnClick = (e)=>{////-----------------------------------------------------------------
    console.log('e', e.currentTarget.id);
    Router.push('/Panels/TechDiscuss/'+String(e.currentTarget.id));
  }////-------------------------------------------------------------------------------------------

  return(
      <>
      <Header/>
      <Rightside/>

      
      <div>
        <Box className={styles.showbackground} sx={{ width: 1365, height: '150%', backgroundColor: '#F6F7FB', }} />
        <div className={styles.showsubtitle}>협업 공연</div>

        <Button className={styles.addconcertbutton} variant="contained" onClick={handleOpen}>+ 새로운 공연 추가</Button>

        <div className={styles.searchconcert}>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="공연 검색" inputProps={{ 'aria-label': 'search google maps' }} />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"> <SearchIcon /> </IconButton>
          </Paper>
        </div>     

        {/* ***PERPORM CARD DISPLAY***  */}
          <div className={cardsty.card_container} style= {{ position:"absolute", top:"250px", overflow:"auto", width:"1320px", height:"340px"}} >
            { 
            list.map((item)=>(
                <Card className={cardsty.card_item} sx={{ minWidth: 300, minHeight: 300, borderColor: 'primary.main', border:0 }}>
                  <CardActionArea>
                    <CardActions>
                      <CardMedia
                        component="img"
                        // !!!!!카드 이미지 높이 설정!!!!
                        height="180px"
                        image={'/uploads/'+item.plan_firstimage}
                        alt="IU"  
                        onClick={cardHandler}
                        id={item.plan_id}
                      />
                      </CardActions>
                    </CardActionArea>
                    <CardContent>
                      <Typography className={cardsty.name} gutterBottom component="div" >{item.plan_name}</Typography>
                      <Typography className={cardsty.title} >장르 </Typography>
                      <Typography className={cardsty.content} >{item.plan_genre}</Typography>
                      <Typography className={cardsty.title}> 일시 </Typography>
                      <Typography className={cardsty.content}>{item.plan_start+' ~ '+item.plan_end}</Typography>
                    </CardContent> 
                    {/* <Combo/> */}
                </Card>
            )) }
          </div>
        
        <div className={styles.ingtitle1} style={{ margin:"50px 0px 0px"}}>{planname} <span style={{color:'#000000', margin:"0px 8px 0px"}}> 공연 진행상황</span></div>
        < DialogNewProject open={open} close={handleClose} getdialogdata={handleDialogData}/>
        
        {/* ***TAB PANEL ***  */}
        <div style= {{ position:"absolute", top:"750px", left:"20px", width:"1400px", height:"650px"}}>
          <Box sx={{ width: 1310 , height: 600 }}> {/*!!! 판넬 Size  */}
            <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" >
                <Tab style={{textTransform:'none'}} label={<span className={classes.customStyleOnTab}>About</span>} {...a11yProps(0)}/> 
                <Tab style={{textTransform:'none'}} label={<span className={classes.customStyleOnTab}>Pre-Production</span>} {...a11yProps(1)} />
                <Tab style={{textTransform:'none'}} label={<span className={classes.customStyleOnTab}>Production</span>} {...a11yProps(2)} />
                <Tab style={{textTransform:'none'}} label={<span className={classes.customStyleOnTab}>Post-Production</span>} {...a11yProps(3)} />
              </Tabs>
            </Box> 
              {/* *** ABOUT TAB *** */}
              <TabPanel value={tabValue} index={0}>                
                <div style={{display: 'flex', flexDirection: "row", width:"1260px"}}>     
                   
                  <Paper sx={{width:640, height:400}} elevation={1} > {/*!!! 판넬내 페이지 사이즈 */}
                    <img src="images/show.jpg" width="60" height="60" style={{margin:"30px 30px 0px"}}></img>
                    <div className={styles.boxinfo} style={{margin:"-70px 110px 0px"}}>공연기획 정보</div>
                    <div className={styles.boxtitle} style={{margin:"5px 110px 0px"}}>{planname} 공연기획 정보</div>
                    <div className={styles.boxdate} style={{margin:"5px 110px 0px"}}>마지막 수정</div>                    
                    <Button style={{left:470, top:-80}} variant="contained" onClick={onPlanBtnClick}>{planInfoState}</Button>
                    <div className={styles.boxdate} style={{margin:"15px 270px 0px"}}><Combo/></div>
                  </Paper>
                   
                  <Paper sx={{width:640, height:400, m:"0px 20px 0px"}} elevation={1}>
                    <img src="images/show.jpg" width="60" height="60" style={{margin:"30px 30px 0px"}}></img>
                    <div className={styles.boxinfo} style={{margin:"-70px 110px 0px"}}>공연장 정보</div>
                    <div className={styles.boxtitle} style={{margin:"5px 110px 0px"}}>{planname} 공연장 정보</div>
                    <div className={styles.boxdate} style={{margin:"5px 110px 0px"}}>마지막 수정</div>                    
                    <Button style={{left:470, top:-80}} variant="contained" onClick={onTheaterBtnClick}>{theaterInfoState}</Button>
                    <div className={styles.boxdate} style={{margin:"15px 280px 0px"}}><Combo/></div>
                  </Paper>                  
                </div>

              </TabPanel>

              {/* *** PRE-PRODUCTION TAB *** */}
              <TabPanel value={tabValue} index={1}> 
                <div style={{display: 'flex', flexDirection: "row", width:"1284px"}}>
                  <div  style={{width: '650px'}}>  
                  <Paper className={cardsty.scrollstyle} sx={{width:640, height:400, overflow:'auto'}} elevation={1}> {/*!!! 판넬내 페이지 사이즈 */}
                  
                  {
                  hopeList.map((item, i)=>(                    
                    <div style={{display:"flex", flexDirection:"row"}}>                
                      <img src={`/uploads/${item}`} width="60" height="60" style={{margin:"30px 30px 0px"}} alt={item}></img>                   
                      <div>
                        <div className={styles.boxinfo} style={{margin:"20px 0px 0px"}}>희망연출 정보</div>
                        <div className={styles.boxtitle} style={{margin:"5px 0px 0px"}}>{hopeName[i]} 희망연출 정보</div>
                        <div className={styles.boxdate} style={{margin:"5px 0px 0px"}}>마지막 수정 {hopeLastTime[i]}</div>                        
                        <Button id={hopeIds[i]} style={{left:400, top:-80}} variant="contained" onClick={onHopeBtnClick}>바로가기</Button>
                        <div className={styles.boxdate} style={{margin:"15px 200px 0px"}}><Combo/></div>
                      </div>                    
                    </div>
                  ))                   
                  }                  
                  </Paper>
                  </div>


                  <Paper className={cardsty.scrollstyle} sx={{width:640, height:400, overflow:'auto',  m:"0px 20px 0px"}} elevation={1}>
                  { 
                      techList.map((item, i)=>(
                        <div style={{display:"flex", flexDirection:"row"}}>                          
                          <img src={`/uploads/${item}`} width="60" height="60" style={{margin:"30px 30px 0px"}} alt={item}></img>
                          <div>
                            <div className={styles.boxinfo} style={{margin:"20px 0px 0px"}}>기술구체화 정보</div>
                            <div className={styles.boxtitle} style={{margin:"5px 0px 0px"}}>{techName[i]} 기술구체화 정보</div>
                            <div className={styles.boxdate} style={{margin:"5px 0px 0px"}}>마지막 수정 {techLastTime[i]}</div>                            
                            <Button id={techIds[i]} style={{left:365, top:-80}} variant="contained" onClick={onTechBtnClick}>바로가기</Button>
                            <div className={styles.boxdate} style={{margin:"15px 170px 0px"}}><Combo/></div>
                          </div>                  
                        </div>
                    ))                     
                  }                  
                  </Paper>                                 
                </div>
                <Paper/>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>  {/*** PRODUCTION Tab ***/}

              {/* *** PRODUCTION TAB *** */}
              <div style={{display: 'flex', flexDirection: "row", width:"1260px"}}>                                    
                  <Paper sx={{width:1240, height:400, m:"0px 20px 0px", overflow:'auto'}} elevation={1}>
                  <>제작 정보</>
                  { 
                      productList.map((item, i)=>(
                        <div style={{display:"flex", flexDirection:"row"}}>                                                
                          <img src={`/uploads/${item}`} height="50" alt={item}></img>
                          <div>
                            <div> {productName[i]}</div>
                            <div> 최종 수정일자 : {productLastTime[i]} </div>                            
                            <Button id={productIds[i]} style={{left:400, top:-60}} variant="contained" onClick={onTechBtnClick}>바로가기</Button> 
                            <div className={styles.boxdate} style={{margin:"35px 200px 0px"}}><Combo/></div>
                          </div>
                        </div>
                    ))
                  }               
                  </Paper>                  
                </div>
                <Paper/>

              </TabPanel>      
              <TabPanel value={tabValue} index={3}> {/*** POST-PRODUCTION Tab ***/}

              {/* *** POST-PRODUCTION TAB *** */}
              <div style={{display: 'flex', flexDirection: "row", width:"1260px"}}>                  
                  <Paper sx={{width:680, height:250, overflow:'auto'}} elevation={1} > {/*!!! 판넬내 페이지 사이즈 */}
                  <>반입 정보</>                  
                  {
                  postListIN.map((item, i)=>(                    
                    <div style={{display:"flex", flexDirection:"row"}}>                
                     <img src={`/uploads/${item}`} height="50" alt={item}></img> 
                     <div>
                        <div> {postNameIN[i]} </div>
                        <div> 최종 수정일자:  : {postLastTimeIN[i]} </div>                        
                        <Button id={postIds[i]} style={{left:400, top:-60}} variant="contained" onClick={onHopeBtnClick}>바로가기</Button>
                        <div className={styles.boxdate} style={{margin:"35px 200px 0px"}}><Combo/></div>
                      </div>              
                    </div>
                  ))                   
                  }
                  </Paper>                  
                  <Paper sx={{width:680, height:250, m:"0px 20px 0px", overflow:'auto'}} elevation={1}>
                  <>반출 정보</>
                  { 
                      postListOUT.map((item, i)=>(
                        <div style={{display:"flex", flexDirection:"row"}}>                          
                          <img src={`/uploads/${item}`} height="50" alt={item}></img>
                          <div>
                            <div> {postNameOUT[i]}</div>
                            <div> 최종 수정일자 : {postLastTimeOUT[i]} </div>
                            <Button id={postIds[i]} style={{left:400, top:-60}} variant="contained" onClick={onTechBtnClick}>바로가기</Button>
                            <div className={styles.boxdate} style={{margin:"35px 200px 0px"}}><Combo/></div>
                          </div>
                        </div>
                    ))                     
                  }                  
                  </Paper>               
                </div>
                <div>
                <Paper sx={{width:1240, height:150, overflow:'auto'}} elevation={1}> {/*!!! 판넬내 페이지 사이즈 */}
                  <>기타</>                  
                  {
                  postListETC.map((item, i)=>(                    
                    <div style={{display:"flex", flexDirection:"row"}}>                
                      <img src={`/uploads/${item}`} height="50" alt={item}></img>
                      <div>
                        <div> {postNameETC[i]}</div>
                        <div> 최종 수정일자:  : {postLastTimeETC[i]} </div>
                        <Combo/>
                        <Button id={postIds[i]} style={{left:0, top:0}} variant="contained" onClick={onHopeBtnClick}>바로가기</Button>
                      </div>
                    </div>
                  ))                   
                  }                
                  </Paper>   
                </div>
                <Paper/>
              </TabPanel>      
            {/* </Box> */}
          </Box>   
        </div>         
      </div>
      </>               
  );
}