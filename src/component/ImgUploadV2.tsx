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
  
  const deleteHandler =(index) =>{
    console.log("deleting index", index);
    //지워질 이미지 이름 저장.
    let delThumb = thumb[index];

    //이미지 스테이트에 들어있는 모든 이미지 이름을 복사해서
    // newThemb이라는 배열에 넣는다.
    let newThumb = [...thumb];

    //newThumb배열안에 있는 파일 이름 중 
    //클릭한 인덱스의 파일이름을 지워줌
    newThumb.splice(index, 1);

    //새로운 이미지 이름 배열인 newThumb으로
    //setThumb 해준다.
    setThumb(newThumb);
    
    ////미리 저장된 지워질 이미지을 Sever측에 삭제 요청 API를 호출한다.
     const data = "e:/webdev_work/nextjsweb/public/uploads/"+ delThumb;
     console.log("deleting file", delThumb);
     
     Axios.post("/api/deletefile", {data}).then((res)=>{
       if(res.status == 200){
    //       //login 성공
           console.log("파일삭제 결과", res.data.users);
       }
     });    
    ////////

    ///MySQL에 지워진 파일을 반영한 이미지 파일이름 배열 데이터 저장    
    console.log("deleted 배열", newThumb);
    Axios.post("/api/jsonaccess", {newThumb}).then((res)=>{
      if(res.status == 200){
          //login 성공
          console.log("삭제후 DB결과",res.data.users);
      }
    });
    ///

    /////MySQL에 저장된 이미지 파일이름 배열 데이터를 가지고 와서 Json 형식을 파싱하여 
    //// 이미지 파일이름 배열 변수(string형식)에 저장함.
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



  }; //End Of deleteHandler
  

  const onDrop = useCallback(
    
  
    acceptedFiles => {
      const formData = new FormData();
      const config = { headers: { "content-type": "multipart/form-data" } }

      acceptedFiles.forEach((file) => {        
        formData.append("file", file);
        console.log("acceptFilesNum",acceptedFiles);
      })

    {///let은 Block 내에서만 작용하기 떄문에 newThumb을 사용하려면 이렇게 빈 블럭구분을 사용해야 함.
      let newThumb = [...thumb]; 
      Axios.post<any>("/api/imgupload", formData, config).then((res) => {                 
        setThumb([...thumb, ...res.data]);        
        newThumb =[...thumb, ...res.data];
        console.log("new thumb list", newThumb);

        /////MySQL에 Upload한 이미지 파일이름 배열 데이터 저장    
        Axios.post("/api/jsonaccess", {newThumb}).then((res)=>{
          if(res.status == 200){
            //login 성공
            console.log("Upload DB저장 결과", res.data.user);
          }
        });
      /////
      });    
    }
    
    
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
            thumb.map((item: string, index: number) => {
              return (              
                <div>                  
                  <img src={`/uploads/${item}`} height="50" alt="업로드이미지"></img>
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <HighlightOffIcon onClick={()=> deleteHandler(index)}/>
                  </IconButton>                                    
                </div>
              );
            })}
            </div>
      </div>
    
  );



};

export default ImgUpload;
