import React, { useState,useEffect, useCallback, useContext } from "react";
import sty from '../css/TheaterInfoPanel.module.css';
import Button from '@mui/material/Button';

import ListViewPicture from './ListViewPicture';



/////=========== PlanInfoPanel 메인 페이지 ================================
export default function TechCommentElement(props){ 

  const [photos, setPhotos]  = useState([{}]);

  
    function parseImage(imagelist){
        let photosFormat =[];

        //// 가져온 DB값으로 FirstImage 및 photos 변경 => <img> 및 ListViewPicture props로 전달 /////        
        if(imagelist){
            imagelist.map((photo)=>{
            photo = '/uploads/'+ photo;
            photosFormat.push({src:photo,width:3,height:3});                        
          });      
          setPhotos(photosFormat);
        }
        else {
            setPhotos(null);
        }
  }

  useEffect(()=>{   
      console.log('element');
    parseImage(props.value.image);

  },[props.value.image]);

    console.log('Props of Element', props.value.image);
  return(       
    <>
        <div>{props.value.name}{props.value.team}{props.value.lasttime}{props.value.contents}</div>
            { photos ? <div><ListViewPicture photos={photos}/> </div> : null }
    </>   
  );
}