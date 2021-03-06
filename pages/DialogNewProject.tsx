import React from 'react';
import styles from '../src/css/Show.module.css';
import sty from '../src/css/planInfoWirte.module.css';
import { Checkbox, FormControlLabel, Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, 
  FormControl, Select, TextField, Paper, InputBase} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useDropzone } from 'react-dropzone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Axios from 'axios';
import { useState,useEffect, useCallback, useMemo} from "react";
import { useForm } from "react-hook-form";
import {IconButton} from '@mui/material';
import { FormInputText } from "../src/component/FormInputText";
import { FormInputDatetimePicker } from "../src/component/FormInputDatetimePicker";
import {FormInputDropdown} from '../src/component/FormInputDropdown'

  ////  Dropzone에 사용할 변수
  type Information = { src:string; width:number; height:number };
  var pics = new Array<Information>(); 
  var pic_count:number = 0 ;
  var imgUploadFileList:string;

  ////// Dropzone Style 적용: Dropzone Area width, height 등.
  const baseStyle = {
    display : 'flex',
    align: 'center',
    padding: '2px',
    borderWidth: 3,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out',
    width: '600px',
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
//////

//---------------- Image File Drag&Drop Component ----------------
const ImgUpload = (props) => {

  const [thumb, setThumb] = useState<string>();
  const [progress, setProgress] = useState<number>(0);

  //--- 이미지 thumbnail의 Delete Icon Button의 이벤트 핸들러
  const deleteHandler =() =>{      
      
    //지워질 이미지 이름 저장.
      let delThumb = thumb;       
      setThumb("");
      
      ////미리 저장된 지워질 이미지을 Sever측에 삭제 요청 API를 호출한다.
      const data = "c:/Web/nextjsweb/public/uploads/"+ imgUploadFileList;
      
      Axios.post("/api/deletefile", {data}).then((res)=>{
      if(res.status == 200){      
          console.log("파일삭제 결과", res.data.users);
      }
      });      

  }; //End Of deleteHandler

  //--- Dropzone Area Drop시의 이벤트 핸들러
  const onDrop = useCallback(
      acceptedFiles => {
          const formData = new FormData();
          const config = { headers: { "content-type": "multipart/form-data" } }

          acceptedFiles.forEach((file) => {        
              formData.append("file", file);
          })

           Axios.post<any>("/api/imgupload", formData, config).then((res) => {                 
                  setThumb(res.data); 
                  imgUploadFileList=res.data;
                  console.log('res.data',res.data);
           });    
      }, [thumb])
 
  //--- Dropzon Area 설정 및 작동 부분 
  const {getRootProps,getInputProps,isDragActive, isDragAccept,isDragReject} = useDropzone({onDrop,accept: 'image/jpeg, image/png', multiple:false});

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
                <p>{props.label}</p>         
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
                      <HighlightOffIcon onClick={()=> deleteHandler()}/>
                  </IconButton>                                    
                  </div>
              );
            })
          }
        </div>
    </div>    
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 816,
  height: 666,
  bgcolor: 'background.paper',
  border: '1px solid #E0E0E0',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

/////=========== modal 메인 페이지 ================================
export default function NewProjectDialog(props) {
  
  const [open, setOpen] = React.useState(props.open);
  const handleClose = () => {
    setOpen(false);
    props.close();
  }

  // Select information
  const [info, setInfo] = React.useState('');
  //장르선택 핸들러
  const handleGenreChange = (event) => {
    setInfo(event.target.value);
  };
  
  
  const Input = styled('input')({
    display: 'none',
  });
  

  interface IDialogueNewProject {
    prj_genre: string,
    prj_name: string,
    prj_start: string,
    prj_end: string,
    prj_firstimage: string
  };

  const defaultValues = {
    prj_genre: '',
    prj_name: '',
    prj_start: '',
    prj_end: '',
    prj_firstimage: ''
  };

  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;


  //부모에게 값 전달
  const onSubmit = (dialogdata:IDialogueNewProject)=>{
    dialogdata.prj_firstimage = imgUploadFileList;
    props.getdialogdata(dialogdata);
    setOpen(false);
    props.close();
  };

  const options = [ "뮤지컬", "무용", "연극", "음악", "쇼", "기타 예술 공연" ];

  return (
    <>
        <Modal
          open={props.open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Button className={styles.addclosebutton} variant="text" onClick={handleClose}>X</Button>

            <Typography className={styles.addshowtitle}>새로운 공연</Typography>
            <Typography className={styles.addshowsubtitle}>기획중인 공연에 대해 간략하게 작성해주세요.</Typography>
            <Divider className={styles.modaldivider} orientation="horizontal" variant="fullWidth" flexItem />            
                <div className={sty.body_row1}>
                    <div className={sty.body_row_subitem1}>장르</div>
                    <div className={sty.body_row_subitem2} style={{width:"130px", margin:"10px 40px 0px"}}><InputLabel>장르 선택</InputLabel><FormInputDropdown MenuList={options} name="prj_genre" control={control} label="Text Input"/></div>
                </div>
                <div className={sty.body_row2}>
                    <div className={sty.body_row_subitem1}>공연명</div>                     

                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="prj_name" control={control} label="공연명을 입력하세요" /></div>
                </div>

                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}>공연예상일자</div>
                    <div className={sty.body_row_subitem2} style={{margin:"0px 20px 0px"}}><FormInputDatetimePicker name="prj_start" control={control} label="시작일자"/></div>
                    <div style={{margin:"15px 0px 0px"}}>-</div>
                    <div style={{margin:"px 20px 0px"}} ><FormInputDatetimePicker name="prj_end" control={control} label="종료일자"/></div>
                </div>
            
            <div className={styles.addshowoption4}>대표 이미지
              <div style={{margin:"15px 0px 0px"}}><ImgUpload label="파일 드래그 또는 클릭하여 공연의 포스터를 추가해주세요."/></div>
            </div>                 
            <Button  className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 500px 0px"}}  onClick={handleSubmit(onSubmit)} >만들기</Button>

          </Box>
        </Modal>
    </>
  );
}