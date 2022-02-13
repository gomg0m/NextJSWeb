import React, { useState,useEffect, useCallback } from "react";
import Header from '../src/fix/Header';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Axios from 'axios';

import {Card, CardContent, CardMedia, Typography, CardActionArea, CardActions } from '@mui/material';
import cardsty from "../src/css/card.module.css"

import {FormInputDropdown} from '../src/component/FormInputDropdown'

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


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Router from "next/router";

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

  function getData(){
      Axios.get("/api/getProjects").then((res) =>{
        console.log("projects get data",res.data.users);
        setList(res.data.users);
          //// 가져온 DB값으로 PlanInfoTable 변경 => ListViewTable props로 전달
          // obj[0].content = res.data.users[0].plan_genre;
          // obj[1].content = res.data.users[0].plan_name;
          // obj[2].content = res.data.users[0].plan_start
          //                   + " ~ " 
          //                   + res.data.users[0].plan_end 
          //                   + '( '+res.data.users[0].plan_time+' 시간)';
          // obj[3].content = res.data.users[0].plan_firstimage;

          //// 가져온 DB값으로 FirstImage 및 photos 변경 => <img> 및 ListViewPicture props로 전달 /////
          //let parsedPhotos = JSON.parse(res.data.users[0].plan_firstimage);
          
          /////파싱된 이미지 파일이름 배열을 react-Gallery 형식에 맞는 photosFormat로 변환 
          // parsedPhotos.map((photo)=>{
          //   photo = '/uploads/'+ photo;
          //   console.log('photo3',photo);
          //   photosFormat.push({src:photo,width:3,height:3});
          // });
          // /////

          // setPhotos(photosFormat);
          // setFirstImage('/uploads/'+parsedPhotos[0]);  //대표이미지이름에 서버 저장경로 붙임.
        // });
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
  
  return(
        <>
        <Header />   
            
          <div className={cardsty.card_container} style= {{ position:"absolute", top:"100px", overflow:"auto", width:"1450px", height:"450px"}} >
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
      </>               
  );
}