import * as React from 'react';
import {Card, CardContent, CardMedia, Typography, CardActionArea} from '@mui/material';
import cardsty from "../css/card.module.css"
import axios from 'axios';
import { useEffect, useState } from 'react';
//import MediaControlCard from './cardmedia';

export default function ActionAreaCard() {
  
  const [list, setListData] = useState([
    {
      img: "images/IU.jpg",
      title: "IU",
      name: "좋아 좋아"
    },
    {
      img: "images/BTS.jpg",
      title: "BTS",
      name: "가자~"
    },
    {
      img: "images/IU.jpg",
      title: "IU",
      name: "와우~~"
    },
    { 
      img:"images/BTS.jpg",
      title: "BTS",
      name: "힘차게!"
    }
  ]);

  const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
  
  function getData() {
    axios.get(API_URL).then(res=>{
      console.log(res.data);
      setListData(res.data);

    });
  }

  return (
    <>
      <div className={cardsty.card_container}>
          { 
          list.map((item)=>(
              <Card className={cardsty.card_item} sx={{ minWidth: 345, minHeight: 350 }} >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.img}
                    alt="IU"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
          )) }
      </div>
      <div className={cardsty.card_container}>
        <div style={{margin: "0px 0px 0px"}}>
            <CardMedia
            component="iframe"
            sx={{ width: 640, height:480 }}
            image="https://www.youtube.com/embed/U_W88C-_HCM"
            alt="Youtube Test"
          />
        </div>
        <div style={{margin: "0px 10px 0px"}}>
            <CardMedia
            component="iframe"
            sx={{ width: 640, height:480 }}
            image="https://www.youtube.com/embed/FzW9J8iU9pQ"
            alt="Youtube Test"
          />
        </div>
        <div>
            <CardMedia
            component="iframe"
            sx={{ width: 640, height:480 }}
            image="https://www.youtube.com/embed/W4gWRK-_It8"
            alt="Youtube Test"
          />
          </div>
      </div>
    </>
  );
} 