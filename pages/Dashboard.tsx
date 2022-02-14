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


/////=========== Dashboard 메인 페이지 ================================
export default function DashboardView(){ 

  const [list, setList] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = ()=> setOpen(false);
  const [open, setOpen] = React.useState(false);

  function getData(){
      Axios.get("/api/getProjects").then((res) =>{
        console.log("projects get data",res.data.users);
        setList(res.data.users);
    });
  }

  useEffect(()=>{getData();},[]);
  
  const btnHandler=()=>{console.log('btn clickted')};
  const cardHandler=(e)=>{
    console.log("e",e.target.attributes[3].value)
    let routeTarget = "/Panels/PlanInfo/"+ e.target.attributes[3].value;
    console.log("id", routeTarget);
    Router.push(routeTarget);
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
          Axios.get("/api/getProjects").then((res)=>{
              if(res.status == 200){
                  //login 성공
                  setList(res.data.users);
              }
          });
      }
    });

  }
  
  return(
        <>
        <Header />   
        <Box className={styles.showbackground} sx={{ width: 1365, height: '100%', backgroundColor: '#F6F7FB', }} />
        <div className={styles.showsubtitle}>협업 공연</div>

        <Button className={styles.addconcertbutton} variant="contained" onClick={handleOpen}>+ 새로운 공연 추가</Button>

        <div className={styles.searchconcert}>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="공연 검색" inputProps={{ 'aria-label': 'search google maps' }} />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"> <SearchIcon /> </IconButton>
          </Paper>
        </div>     

          <div className={cardsty.card_container} style= {{ position:"absolute", top:"300px", overflow:"auto", width:"1310px", height:"450px"}} >
            { 
            list.map((item)=>(
                <Card className={cardsty.card_item} sx={{ minWidth: 345, minHeight: 350 }} >
                  <CardActionArea>
                    <CardActions>
                      <CardMedia
                        component="img"
                        height="150"
                        image={item.plan_firstimage}
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
      </>               
  );
}