import React, { useState, useEffect, useCallback } from "react";
import Header from '../../../src/fix/Header';
import Leftside from '../../../src/fix/Leftside1(1)';
import sty from '../../../src/css/TheaterInfoPanel.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useRouter } from "next/router";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {makeStyles} from '@material-ui/core';


import ListViewTable from '../../../src/component/ListViewTable';
import ListViewPicture from '../../../src/component/ListViewPicture';


/////TabPanel 관련 
  const useStyles = makeStyles({
    customStyleOnTab:{
      fontSize:'20px',
      color:'black',
      fontWeight: '700'
  
    },
    customStyleOnActiveTab:{
      color:'red'
    },
    activeTab:{
      fontSize:'16px',
      fontWeight:'600',
      color:'pink'
    },
    PanelText:{
      fontSize:'16px',
      color:'pink'
    }
  })
  
   

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}      
      {...other}      
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
/////


export default function TheaterInfoPanel(){   
  const classes = useStyles(); /////TabPanne CustomStyle 사용
  const router = useRouter();
  const {Panel_Id} = router.query;

  const [value, setValue] = React.useState(0);  ///TabPanel 관련
  const [theaterInfoTable, setTheaterInfoTable] = useState([
      {name: '공연장소', content: ''},
      {name: '공연장 객석 수', content: ''},
      {name: '공연장 크기', content: ''},
      {name: '특이사항', content: ''}
  ]);

  //Tabs Handle 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var obj = [...theaterInfoTable]; //state인 planInfoTable의 변경에 사용할 변수

  ///// Gallery Image 관련
  const [firstImage, setFirstImage] = useState();
  const [photosDrawing, setPhotosDrawing] = useState([]);
  const [photosInterior, setPhotosInterior] = useState([]);
  const [photosExterior, setPhotosExterior] = useState([]);
  const [photosStage, setPhotosStage] = useState([]);


  ///// useEffect 페이지 DB 초기화 및 photos 초기화 관련
  function getData(id){
    console.log('pageid',Panel_Id);
      Axios.post("/api/getTheaterInfo", {id} ).then((res) =>{
        console.log('info', res.data.users[0] );
        //// 가져온 DB값으로 PlanInfoTable 변경 => ListViewTable props로 전달        
        obj[0].content = res.data.users[0].theater_place;
        obj[1].content = res.data.users[0].theater_seatnumber;
        obj[2].content = res.data.users[0].theater_size;
        obj[3].content = res.data.users[0].theater_exception;
        
        setTheaterInfoTable(obj);  ///DB값을 table state 값으로 

        //// 가져온 DB값으로 FirstImage 및 photos 변경 => <img> 및 ListViewPicture props로 전달 /////
        let ImglistDrawing = JSON.parse(res.data.users[0].theater_drawing);
        let PFDrawing =[];
        let ImglistExterior = JSON.parse(res.data.users[0].theater_exterior);
        let PFExterior =[];
        let ImglistInterior = JSON.parse(res.data.users[0].theater_interior);
        let PFInterior =[];
        let ImglistStage = JSON.parse(res.data.users[0].theater_stage);
        let PFStage =[];
        
        /////파싱된 이미지 파일이름 배열을 react-Gallery 형식에 맞는 photosFormat로 변환 
        if (ImglistDrawing){ //이미지 리스트가 Null이 아니면
          ImglistDrawing.map((photo)=>{
            photo = '/uploads/'+ photo;
            console.log('photo3',photo);
            PFDrawing.push({src:photo,width:3,height:3});
          });     
          setPhotosDrawing(PFDrawing);
        }
        if (ImglistExterior){  //이미지 리스트가 Null이 아니면
          ImglistExterior.map((photo)=>{
            photo = '/uploads/'+ photo;
            console.log('photo3',photo);
            PFExterior.push({src:photo,width:3,height:3});
          });
          setPhotosInterior(ImglistExterior);
        }
        if (ImglistInterior){  //이미지 리스트가 Null이 아니면
          ImglistInterior.map((photo)=>{
            photo = '/uploads/'+ photo;
            console.log('photo3',photo);
            PFInterior.push({src:photo,width:3,height:3});
          });
          setPhotosExterior(PFInterior);
        }
        if (ImglistStage){  //이미지 리스트가 Null이 아니면
          ImglistStage.map((photo)=>{
            photo = '/uploads/'+ photo;
            console.log('photo3',photo);
            PFStage.push({src:photo,width:3,height:3});
          });
          setPhotosStage(PFStage);
        /////
        }                
        if (ImglistDrawing){  //이미지 리스트가 Null이 아니면
          setFirstImage('/uploads/'+ ImglistDrawing[0]);  //대표이미지이름에 서버 저장경로 붙임.
        }

      });
  }
/////
  useEffect(()=>{
    if(Panel_Id)
    {     
      getData(Panel_Id);
    }

    }
  ,[Panel_Id]);
  
  return(
        <>
        <Header />
        <Leftside />
        <div className={sty.infoframe}>            
            <div
                style={{
                    width: "1496px",
                    textAlign: "center",
                    borderBottom: "4px solid #EABB41",
                    lineHeight: "0.2em",
                    margin: "0px 0 20px",                    
                }}></div>
            <div className={sty.layout_top}>
                <div className={sty.layout_top_txt1}>공연장정보</div>
                <div className={sty.layout_top_txt2}>공연장정보</div>
                <div className={sty.layout_top_image}><img src="images/map.png" alt="Map"></img></div>
                <div className={sty.layout_top_table}><ListViewTable tableContents={theaterInfoTable}/></div>
                <div
                    style={{
                        width: "1496px",
                        textAlign: "center",
                        borderBottom: "2px solid #aaa",
                        lineHeight: "0.2em",
                        margin: "40px 0 20px",
                    }}></div>
            <div className={sty.layout_body}>
                <div>공연장 도면</div>
                <div className={sty.layout_body_drawing}> <ListViewPicture photos={photosDrawing}  /> </div>
                <div>공연장 사진</div>
                <div className={sty.layout_body_picture}> 
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label={<span className={classes.customStyleOnTab}>외관</span>} {...a11yProps(0)}/> 
                        <Tab label={<span className={classes.customStyleOnTab}>내부</span>} {...a11yProps(1)} />
                        <Tab label={<span className={classes.customStyleOnTab}>무대공간</span>} {...a11yProps(2)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}><ListViewPicture photos={photosExterior} /></TabPanel>
                    <TabPanel value={value} index={1}><ListViewPicture photos={photosInterior}  /></TabPanel>
                    <TabPanel value={value} index={2}><ListViewPicture photos={photosStage}  /></TabPanel>      
                  </Box>                
                </div>
            </div>
            <div className={sty.layout_bottom}>            
                <Link href="/About">    
                    <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}} variant="contained">  수정하기 </Button>
                </Link>    
            </div>
        </div>
    </div>
    </>                
  );
}