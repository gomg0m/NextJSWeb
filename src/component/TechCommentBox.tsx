import React, { useState,useEffect, useCallback, useContext } from "react";
import {useStyles} from '../../src/css/TechCommentBoxStyles';
import Button from '@mui/material/Button';

import ListViewPicture from './ListViewPicture';



/////=========== PlanInfoPanel 메인 페이지 ================================
export default function TechCommentElement(props){ 
  const classes = useStyles();
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
    <div className={classes.ContainerMain}>
      <div className={classes.ContainerSub1}>
        <div className={classes.Name}> {props.value.name} </div>
        <div className={classes.Team}> {props.value.team} </div>
        <div className={classes.Lasttime}> {props.value.lasttime} </div>
      </div>
      <div className={classes.Content}> {props.value.contents}</div>
            { photos ? <div className={classes.ImgUpload}><ListViewPicture photos={photos}/> </div> : null }
    </div>   
  );
}
