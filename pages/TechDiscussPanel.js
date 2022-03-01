import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside3';
import Rightside from '../src/fix/Rightside2';
import sty from '../src/css/TechDiscussPanel.module.css';
import Link from 'next/link';
// import HopeTableContent from '../src/component/HopeTable_content';
// import HopeTableObjective from '../src/component/HopeTable_objective';
// import HopeTableTech from '../src/component/HopeTable_tech';
import HopePicture from '../src/component/HopePicture';
import { useEffect, useState } from "react";
import Axios from 'axios';
import { Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Input, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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

function createData(name, content) {
    return { name, content };
  }
  
function Subject() {
  
    const [list, setList] = useState(
        [
            {name: '검토 주제', content: ''},
            {name: '세부 주제', content: ''}
        ]);
  
    var obj = 
        [
            {name: '검토 주제', content: ''},
            {name: '세부 주제', content: ''}
        ];
  
     
    function getData(){
      Axios.get("/api/getTechInfo").then((res) =>{
      obj[0].content = res.data.users[0].tech_1stsubject;
      obj[1].content = res.data.users[0].tech_2ndsubject;
  
      setList( obj );
      });
    }
  
      useEffect(() => {
        getData();
      }, []);
      
    return (
        <span> {list[0].content} / {list[1].content} </span>
    );
}

function Name() {
  
    const [list, setList] = useState(
        [
            {name: '기술명', content: ''}
        ]);
  
    var obj = 
        [
            {name: '기술명', content: ''}
        ];
  
     
    function getData(){
      Axios.get("/api/getTechInfo").then((res) =>{
      obj[0].content = res.data.users[0].tech_name;

  
      setList( obj );
      });
    }
  
      useEffect(() => {
        getData();
      }, []);
      
    return (
        <span> {list[0].content} </span>
    );
}

function Contents() {
  
    const [list, setList] = useState(
        [
            {name: '검토내용', content: ''}
        ]);
  
    var obj = 
        [
            {name: '검토내용', content: ''}
        ];
  
     
    function getData(){
      Axios.get("/api/getTechInfo").then((res) =>{
      obj[0].content = res.data.users[0].tech_contents;

  
      setList( obj );
      });
    }
  
      useEffect(() => {
        getData();
      }, []);
      
    return (
        <span> {list[0].content} </span>
    );
}


export default function TheaterInfoPanel(){   
    
    // Modal Open/Close
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

      // Select information
    const [info, setInfo] = React.useState('');
    const handleChange = (event) => {setInfo(event.target.value);};

    const Input = styled('input')({
        display: 'none',
    });

    return(
        <>
        <Header />
        <Leftside />
        <Rightside />
        <div className={sty.infoframe}>
            <div
                style={{
                    width: "1496px",
                    textAlign: "center",
                    borderBottom: "4px solid #ff0000",
                    lineHeight: "0.2em",
                    margin: "0px 0 20px",                    
                }}></div>
            <div className={sty.layout_top}>
                <div className={sty.layout_top_txt1}>제작공간</div>
                <div className={sty.layout_top_txt2}>엔딩 장면 다수의 풍선 날리기</div>
                <div className={sty.subtitle} style={{margin:"50px 30px 0px"}}>최신 자료</div>
                <div><HopePicture /></div>
                
                {/* 게시물 작성 추가 박스 */}
                <div className={sty.addbox} style={{margin:"30px 40px 20px"}}>
                    <div className={sty.boxname} style={{margin:"15px 20px 15px"}}> 게시물 작성 
                    <Button className={sty.plus} variant="text" onClick={handleOpen}>+</Button></div>
                </div>

                {/* 유저들이 작성한 게시물들 */}
                <div className={sty.contentbox} style={{margin:"0px 40px 0px"}}>
                    <div className={sty.boxsubject} style={{margin:"20px 20px 0px"}}><Subject /></div>
                    {/* 이 자리에 회원정보 (id랑 사진) 나와야함 */}
                    <div className={sty.boxname} style={{margin:"20px 20px 0px"}}><Name /></div>
                    <div className={sty.boxcontents} style={{margin:"10px 20px 50px"}}><Contents /></div>
                    <div><HopePicture /></div>
                    <div className={sty.comment} style={{margin:"0px 850px 10px"}}>의견</div>
                </div> 

                {/* 협의 완료 버튼 */}
                <div className={sty.button}>    
                    <Button className={sty.notosanskr_bold_black_24px} style={{margin:"50px 20px 0px"}} variant="contained">  검색 </Button>          
                    <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"50px 20px 0px"}} variant="contained">  협의 완료하기 </Button>
                </div>
            </div>

            {/* 게시물 추가 모달 띄우기 */}
            <Modal
                open={open}
                onClose={handleClose}
            >
            <Box sx={style}>
            <Button className={sty.addclosebutton} variant="text" onClick={handleClose}>X</Button>

            <Typography className={sty.addtitle}>기술구체화협의</Typography>
            <Typography className={sty.addsubtitle}>기술구체화제목!!!!</Typography>
            <Divider className={sty.modaldivider} orientation="horizontal" variant="fullWidth" flexItem />

            <div className={sty.addoption1}>희망연출정보</div>
            <FormControl className={sty.info1} sx={{ minWidth: 300 }}>
              <InputLabel id="demo-simple-select-label">희망연출정보</InputLabel>
              <Select
                value={info}
                label="info"
                displayEmpty
                onChange={handleChange}
              >
                <MenuItem value={1}>엔딩 장면 다수의 풍선 날리기</MenuItem>
                <MenuItem value={2}>사람형태의 빛 연출</MenuItem>
                <MenuItem value={3}>사람만한 과일 모형</MenuItem>
              </Select>
            </FormControl>

            <div className={sty.addoption2}>기술구체화협의명</div>
            <TextField className={sty.info2} sx={{ minWidth: 570 }} id="outlined-basic" label="기술구체화협의명을 입력해주세요." variant="outlined"/>

            <div className={sty.addoption3}>대표 이미지</div>
            <TextField className={sty.info3} sx={{ minWidth: 510 }} id="outlined-basic" label="기술구체회의 대표 이미지를 추가해주세요." variant="outlined"/>
            <Box className={sty.filebackground} sx={{ width: 48, height: 48, backgroundColor: '#F2F2F2', borderRadius: '6px' }} />
            <label htmlFor="icon-button-file" className={sty.fileuploadbutton}>
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton color="inherit" component="span" backgroundColor="#F2F2F2">
                <AttachFileIcon />
              </IconButton>
            </label>
            <Button className={sty.addcreatebutton} variant="contained">만들기</Button>
          </Box>
        </Modal>
        </div>
    </>                
    );
}