import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { UiFileInputButton } from "./UiFileInputButton";
import { IconButton, Slider } from "@material-ui/core";
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Axios from "axios";
import MyDropZone from './Tst_MyDropzone';

  type Information = { src:string; width:number; height:number };

  var pics = new Array<Information>(); 
  var pic_count:number = 0 ;
  
  const ImgUpload = () => {
  const [thumb, setThumb] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  
  const Deleted =() =>{
    console.log("Deleted!") 
    Axios.get("/api/jsonaccess").then((res)=>{
      if(res.status == 200){
          //login 성공
          console.log("JSON Access OK!!", res.data);
          let fN = res.data;
          console.log("fileName", fN.users[0].fn);
          let pp = JSON.parse(fN.users[0].fn);
          console.log("parsing filename", pp);
      }
    });


    // let data = ["F1", "F2", "F3"];
    // Axios.post("/api/jsonaccess", {data}).then((res)=>{
    //   if(res.status == 200){
    //       //login 성공
    //       console.log(res.data.users);
    //   }
    // });


  };


  const onChange = useCallback(
    async (formData: FormData) => {
      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event: { loaded: number; total: number }) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      };

      axios.post<any>("/api/imgupload", formData, config).then((res) => {
        setThumb([...thumb, ...res.data]);        
        console.log(res.data);        
        
        res.data.map(()=>pics.push({src:'', width:3, height:2}));           
        res.data.map((pic:Information, i:number) => {           
          pics[i+pic_count].src= '/uploads/'+ pic;        
        });
        pics[0].width = 3;
        pics[0].height = 2;        
        pic_count = pics.length;        
        console.log("pics", pics);     
        console.log("length",pics.length);
      });
      

    },
    [thumb]
  );

  return (
    
    <div style={{display:"flex"}}>
      <div>      
        {/* <UiFileInputButton
          label="Upload File 선택"
          // allowMultipleFiles 가 false 일경우, 하나씩만 올릴 수 있다.
          allowMultipleFiles={true}
          uploadFileName="file"
          onChange={onChange}
        /> */}
        <MyDropZone/>
        <Slider value={progress} />   
      </div>
      <div style={{margin:"0px 15px 0px", display:"flex"}}>
          {thumb &&
            thumb.map((item: string, i: number) => {
              console.log("item", item);
              return (              
                <div>                  
                  <img src={`/uploads/${item}`} height="50" alt="업로드이미지"></img>
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <HighlightOffIcon onClick={Deleted}/>
                  </IconButton>                                    
                </div>
              );
            })}
            </div>
      </div>
    
  );
};

export default ImgUpload;