import React, { useState,useEffect, useCallback, useMemo } from "react";
import Header from '../src/fix/Header';
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

import { useContext } from "react";
import AppContext from "../src/component/AppContext";


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

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return(
  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">모든상태</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>계획중</MenuItem>
    <MenuItem value={20}>제작중</MenuItem>
    <MenuItem value={30}>종료</MenuItem>
  </Select>
</FormControl>
);
}

 
/////TabPanel 관련 
const useStyles = makeStyles({
  customStyleOnTab:{
    fontSize:'20px',
    color:'black',
    fontWeight: '700'

  },
  customStyleOnActiveTab:{
    color:'red'
  },
  activeTab:{
    fontSize:'16px',
    fontWeight:'600',
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

/////=========== Dashboard 메인 페이지 ================================
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
  const [techLastTime, setTechLastTime] = useState([]);
  const [hopeIds, setHopeIds] = useState([]);
  const [techIds, setTechIds] = useState([]);

  const globalPlanID = useContext(AppContext);

  var CardID:number;

  function getData(){
      Axios.get("/api/getProjects").then((res) =>{
        console.log("projects get data",res.data.users);
        setList(res.data.users);
    });
  }

  useEffect(()=>{getData();},[]);
  
  const btnHandler=()=>{console.log('btn clickted')};
  
  /////-----Card Image Click시 핸들러 
  const cardHandler=(e)=>{
    console.log("e",e)        
    setCardID(e.currentTarget.id);
    console.log("id", cardID);
    clickID = e.currentTarget.id;
    console.log("clickid",clickID);
    console.log("tabValue",tabValue);

    globalPlanID.statefunc(100);

    if(tabValue==0) {
      AboutButtonState(e.currentTarget.id);
    }

    if(tabValue==1)
    {
      let id=clickID;
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
                console.log(res.data.users);
                let hopefirstimg=[];
                let hopelasttime=[];
                res.data.users.map((item)=>{hopefirstimg.push(JSON.parse(item.hope_firstimage))});
                res.data.users.map((item)=>{hopelasttime.push(item.hope_lasttime)});
                console.log('hopeimagelist',hopefirstimg);
                console.log('hopelasttime',hopelasttime);
                setHopeList(hopefirstimg);
                setHopeLastTime(hopelasttime);
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
                        res.data.users.map((item)=>{techfirstimg.push(JSON.parse(item.tech_firstimage))});
                        res.data.users.map((item)=>{techlasttime.push(item.tech_lasttime)});
                        console.log('techimagelist',techfirstimg);                      
                        console.log('techlasttime',techlasttime);
                        setTechList(techfirstimg);                        
                        setTechLastTime(techlasttime);
                    }//if
                });
            }//if status
          });//end of Axio                  
        }
      });//end of Axio  
    }    
  };
//////-----


  function AboutButtonState(id){
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

  //Tab Chaned Event
  const handleTabChange = (event, newValue) => {    
    setTabValue(newValue);
    console.log('tabid',newValue);
    console.log('cardid',cardID);
    console.log('clicid',clickID);
    switch(newValue) {
      case 0: //About
        break;
      case 1:  // pre-production
        //Axio.post('path',{id}) get hopeinfo & theaterinfo db data from table
        //setHopeInfo(data), setTheaterInfo(data)
        // let id=cardID;
        // Axios.post("/api/getPlanInfo", {id} ).then((res) => {
        //   if(res.status==200)
        //   {
        //     let parsedList = JSON.parse(res.data.users[0].plan_hopeids);
        //     console.log('parsedlist',parsedList);
        //     let ids =[...parsedList];
        //     console.log('ids',ids)
        //     Axios.post("/api/getHopeInfoids", {ids}).then((res)=>{
        //       if(res.status == 200){
        //           //login 성공
        //           console.log(res.data.users);
        //           let kkk=[];
        //           res.data.users.map((item)=>{kkk.push(JSON.parse(item.hope_firstimage))});
        //           console.log('hopeimagelist',kkk);
        //           setHopeList(kkk);
        //           //대쉬보드 업데이트를 위해서 다시한번 정보가져와서 카드list 리랜더링
        //           Axios.post("/api/getTechInfoids", {ids}).then((res)=>{
        //               if(res.status == 200){
        //                   //login 성공
        //                   console.log(res.data.users);
        //                   let kkk=[];
        //                   res.data.users.map((item)=>{kkk.push(JSON.parse(item.hope_firstimage))});
        //                   console.log('techimagelist',kkk);                          
        //                   setTechList(kkk);
        //               }//if
        //           });
        //       }//if status
        //     });//end of Axio                  
        //   }
        // });//end of Axio                  
        break;
      case 2:  // production
        break;
      case 3:  // post-production
        break;
      default:
        break;
    }
  };

  interface IDialogueNewProject {
    prj_genre: string,
    prj_name: string,
    prj_start: string,
    prj_end: string,
    prj_firstimage: string
  }

  function handleDialogData(diglogdata:IDialogueNewProject){
    console.log('handleDialogData',diglogdata);
    Axios.post("/api/insertPrjInfo", {diglogdata}).then((res)=>{
      if(res.status == 200){
          //login 성공
          console.log(res.data.users);
          //대쉬보드 업데이트를 위해서 다시한번 정보가져와서 카드list 리랜더링
          Axios.get("/api/getProjects").then((res)=>{
              if(res.status == 200){
                  //login 성공
                  setList(res.data.users);
              }
          });
      }
    });//end of Axio

  }

  const onTheaterBtnClick= ()=>{
    if (theaterInfoState=="진행중"){
        Router.push('/Panels/TheaterInfo'+String(cardID));
    }
    if (theaterInfoState=="완료"){
        Router.push('/Panels/TheaterInfo'+String(cardID));
    }
    if (theaterInfoState=="+ 새로 생성"){
      Router.push('TheaterInfoWrite');
    }

  }
   
  const onPlanBtnClick= ()=>{
    if (planInfoState=="진행중"){
      Router.push('/Panels/PlanInfo/'+String(cardID));
    }
    if (planInfoState=="완료"){
      Router.push('/Panels/PlanInfo/'+String(cardID));
    }
    if (planInfoState=="+ 새로 생성"){
      Router.push('PlanInfoWrite');
    }
  }

  const onHopeBtnClick = (e)=>{
    console.log('clickid', e.currentTarget.id);

    Router.push('/Panels/HopeInfo/'+String(e.currentTarget.id));
  }

  const onTechBtnClick = (e)=>{
    console.log('e', e.currentTarget.id);
    Router.push('/Panels/TechDiscuss/'+String(e.currentTarget.id));
  }

  return(
        <>
        <Header />
      <div>
        <Box className={styles.showbackground} sx={{ width: 1365, height: '100%', backgroundColor: '#F6F7FB', }} />
        <div className={styles.showsubtitle}>협업 공연</div>

        <Button className={styles.addconcertbutton} variant="contained" onClick={handleOpen}>+ 새로운 공연 추가</Button>

        <div className={styles.searchconcert}>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="공연 검색" inputProps={{ 'aria-label': 'search google maps' }} />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"> <SearchIcon /> </IconButton>
          </Paper>
        </div>     
          <div className={cardsty.card_container} style= {{ position:"absolute", top:"300px", overflow:"auto", width:"1310px", height:"550px"}} >
            { 
            list.map((item)=>(
                <Card className={cardsty.card_item} sx={{ minWidth: 345, minHeight: 350, borderColor: 'primary.main', border:0 }}  >
                  <CardActionArea>
                    <CardActions>
                      <CardMedia
                        component="img"
                        // !!!!!카드 이미지 높이 설정!!!!
                        height="250px" 
                        image={'/uploads/'+item.plan_firstimage}
                        alt="IU"  
                        onClick={cardHandler}
                        id={item.plan_id}
                      />
                      </CardActions>
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div">
                        {item.plan_name}
                        <Combo/>
                      </Typography>
                      <Typography variant="h5" color="text.secondary">
                        {item.plan_genre}
                      </Typography>
                      <Typography variant="h5" color="text.secondary">
                        {item.plan_start+' ~ '+item.plan_end}
                      </Typography>
                    </CardContent>
                  
                  <CardActions>
                    <Button size="small" color="primary" onClick={btnHandler}>
                      Share
                    </Button>
                </CardActions>  
                </Card>
            )) }
        </div>
        < DialogNewProject open={open} close={handleClose} getdialogdata={handleDialogData}/>
        <div style= {{ position:"absolute", top:"900px", left:"20px", width:"1400px", height:"650px"}}>
          <Box sx={{ width: 1310 , height: 600 }}> {/*!!! 판넬 Size  */}
            <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" >
                <Tab label={<span className={classes.customStyleOnTab}>About</span>} {...a11yProps(0)}/> 
                <Tab label={<span className={classes.customStyleOnTab}>Pre-Production</span>} {...a11yProps(1)} />
                <Tab label={<span className={classes.customStyleOnTab}>Production</span>} {...a11yProps(2)} />
                <Tab label={<span className={classes.customStyleOnTab}>Post-Production</span>} {...a11yProps(3)} />
              </Tabs>
            </Box> 
            <Box  sx={{ bgcolor: 'background.default', flexWrap: 'wrap','& > :not(style)': { m: 1, width: 528, height: 328,},}} >              
              <TabPanel value={tabValue} index={0}>                
                <div style={{display: 'flex', flexDirection: "row", width:"1260px"}}>                  
                  <Paper sx={{width:680, height:280}} elevation={1}> {/*!!! 판넬내 페이지 사이즈 */}
                    <div className={styles.showsubtitle}>기획 정보</div>
                    <Button style={{left:460, top:20}} variant="contained" onClick={onPlanBtnClick}>{planInfoState}</Button>
                  </Paper>
                  <Paper sx={{width:680, height:280, m:"0px 20px 0px"}} elevation={1}>
                    <div className={styles.showsubtitle}>기획 정보</div>
                    <Button style={{left:460, top:20}} variant="contained" onClick={onTheaterBtnClick}>{theaterInfoState}</Button>
                  </Paper>                  
                </div>

              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <div style={{display: 'flex', flexDirection: "row", width:"1260px"}}>                  
                  <Paper sx={{width:680, height:280}} elevation={1}> {/*!!! 판넬내 페이지 사이즈 */}
                  <>희망연출 정보</>
                  {
                  hopeList.map((item, i)=>(                    
                    <div style={{display:"flex", flexDirection:"row"}}>                
                      <img src={`/uploads/${item}`} height="50" alt={item}></img>                   
                      <div>
                            <div> 희망연출 명</div>
                            <div> 최종 수정일자:  : {techLastTime[i]} </div>
                        </div>
                      <Button id={hopeIds[i]} style={{left:0, top:0}} variant="contained" onClick={onHopeBtnClick}>바로가기</Button>
                    </div>
                  )) 
                  
                  }
                
                  </Paper>
                  
                  <Paper sx={{width:680, height:280, m:"0px 20px 0px"}} elevation={1}>
                  <>기술 구체화 정보</>
                  { 
                      techList.map((item, i)=>(
                        <div style={{display:"flex", flexDirection:"row"}}>                          
                          <img src={`/uploads/${item}`} height="50" alt={item}></img>
                          <div>
                            <div> 기술구체화 명</div>
                            <div> 최종 수정일자 : {hopeLastTime[i]} </div>
                          </div>
                          <Button id={techIds[i]} style={{left:0, top:0}} variant="contained" onClick={onTechBtnClick}>바로가기</Button>                    
                        </div>
                    )) 
                    
                  }                  
                  </Paper>                  
                </div>
                <Paper/>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Paper/>
              </TabPanel>      
              <TabPanel value={tabValue} index={3}>
                <Paper/>
              </TabPanel>      
            </Box>
          </Box>   
        </div>         
      </div>
      </>               
  );
}