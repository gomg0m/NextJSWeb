import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton } from "@material-ui/core";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDropzone } from 'react-dropzone';
import Axios from "axios";


  type Information = { src:string; width:number; height:number };

  var pics = new Array<Information>(); 
  var pic_count:number = 0 ;
  
  const baseStyle = {
    display : 'flex',
    align: 'center',
    padding: '2px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out',
    width: '300px',
    height: '40px',
    margin: "-10px 30px 0px",
    font: 'bold 0.7em/1em areal',
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

  


  const ImgUpload = () => {



  const [thumb, setThumb] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  
  const Deleted =() =>{
    console.log("Deleted!") 
    // Axios.get("/api/jsonaccess").then((res)=>{
    //   if(res.status == 200){
    //       //login 성공
    //       console.log("JSON Access OK!!", res.data);
    //       let fN = res.data;
    //       console.log("fileName", fN.users[0].fn);
    //       let pp = JSON.parse(fN.users[0].fn);
    //       console.log("parsing filename", pp);
    //   }
    // });
    const data = "e:/webdev_work/nextjsweb/public/uploads/"+ "2202032302_IU.jpg";
    Axios.post("/api/deletefile", {data}).then((res)=>{
      if(res.status == 200){
          //login 성공
          console.log(res.data.users);
      }
    });
  };

   const onChange = useCallback(
    async (formData: FormData) => {
      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event: { loaded: number; total: number }) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      };

      Axios.post<any>("/api/imgupload", formData, config).then((res) => {
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

  const onDrop = useCallback(
     
    acceptedFiles => {
      const formData = new FormData();
      const config = { headers: { "content-type": "multipart/form-data" } }

      acceptedFiles.forEach((file) => {        
        formData.append("file", file);
        console.log("acceptFilesNum",acceptedFiles.length);
      })

      Axios.post<any>("/api/imgupload", formData, config).then((res) => {
        setThumb([...thumb, ...res.data]);        
        console.log("KJY:Axios.Post=>res.data", res.data);        
        
        res.data.map(()=>pics.push({src:'', width:3, height:2}));           
        res.data.map((pic:Information, i:number) => { pics[i+pic_count].src= '/uploads/'+ pic; });
        pics[0].width = 3;
        pics[0].height = 2;        
        pic_count = pics.length;        
        console.log("pics", pics);     
        console.log("length",pics.length);
    });
    
    
  }, [thumb])
   

  const {getRootProps,getInputProps,isDragActive, isDragAccept,isDragReject} = useDropzone({onDrop,accept: 'image/jpeg, image/png', multiple:true});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    
    <div style={{display:"flex"}}>
      <div>      
        <div {...getRootProps({style})} >    
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>여기에 드롭!</p> :
              <p>파일 드래그 또는 클릭</p>         
          }      
        </div>
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
