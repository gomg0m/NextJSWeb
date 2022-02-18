import React, { useState,useEffect } from 'react';
import Header from '../src/fix/Header';
import sty from '../src/css/HopeDashboard.module.css';
import Footer from "../src/fix/Footer";
import Leftside from '../src/fix/Leftside';
import Link from 'next/link';

import Axios from 'axios';
import {Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material';
import cardsty from "../src/css/card.module.css"
import { Box, Button, Typography } from '@mui/material';
import Router from "next/router";


/////=========== Dashboard 메인 페이지 ================================
function Preproduction1() {
  
  const [list, setList] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = ()=> setOpen(false);
  const [open, setOpen] = React.useState(false);

  function getData(){
      Axios.get("/api/getHopeInfo").then((res) =>{
        console.log("projects get data",res.data.users);
        setList(res.data.users);
    });
  }

  useEffect(()=>{getData();},[]);
  
  const btnHandler=()=>{console.log('btn clickted')};

  const cardHandler=(e)=>{
    console.log("e:", e.target.attributes[3].value)
    let routeTarget = "/Panels/HopeInfo/"+ e.target.attributes[3].value;
    console.log("id", routeTarget);
    Router.push(routeTarget);
  };

  return (
    <>
      <Header />
      <Leftside />
        <Box className={sty.prebackground1} sx={{ width: 1560, height: '100%', backgroundColor: '#F6F7FB'}} />
        <div className={sty.presubtitle1}>희망연출정보</div>

        <Link href ='/HopeInfoWrite'>
          <Button className={sty.addinfobutton1} variant="contained" onClick={handleOpen}>+ 새로운 연출정보 추가</Button>
        </Link>
        <div className={sty.order1}>최근 생성순</div>
        <div className={sty.order2}>모든상태</div>

        <div className={cardsty.card_container} style= {{ position:"absolute", top:"300px", overflow:"auto", width:"1310px", height:"450px"}} >
            { 
            list.map((item)=>(
                <Card className={cardsty.card_item} sx={{ minWidth: 345, minHeight: 350}} >
                  <CardActionArea>
                    <CardActions>
                      <CardMedia
                        component="img"
                        height="150"
                        image={'/uploads/'+item.hope_firstimage}
                        onClick={cardHandler}
                        id={item.hope_id}
                      />
                      </CardActions>
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div">
                        {item.hope_name}
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

export default Preproduction1;