import React, { useState, useEffect, useCallback } from "react";
import Header from '../../../src/fix/Header';
import Leftside from '../../../src/fix/Leftside1(1)';
import sty from '../src/css/TheaterInfoPanel.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Axios from 'axios';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {makeStyles} from '@material-ui/core';

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
  

    // const [list, setList] = useState([
    //   {name: '공연장소', content: ''},
    //   {name: '공연장 객석 수', content: ''},
    //   {name: '공연장 크기', content: ''},
    //   {name: '특이사항', content: ''}
    // ]);
  
    // var obj = [
    //   {name: '공연장소', content: ''},
    //   {name: '공연장 객석 수', content: ''},
    //   {name: '공연장 크기', content: ''},
    //   {name: '특이사항', content: ''}
    // ];
  
    // function getData(){
    //   Axios.get("/api/getTheaterInfo").then((res) =>{
    //   obj[0].content = res.data.users[0].hall_place;
    //   obj[1].content = res.data.users[0].hall_seatnumber + "석";
    //   obj[2].content = res.data.users[0].hall_size + "㎡" ;
    //   obj[3].content = res.data.users[0].hall_exception;
  
    //   setList( obj );
    //   });
    // }

    

function BasicPagination() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} />
      <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} disabled />
    </Stack>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TheaterPicture(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label={<span className={classes.customStyleOnTab}>외관</span>} {...a11yProps(0)}/> 
          <Tab label={<span className={classes.customStyleOnTab}>내부</span>} {...a11yProps(1)} />
          <Tab label={<span className={classes.customStyleOnTab}>무대공간</span>} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}><TheaterPictureExternal /></TabPanel>
      <TabPanel value={value} index={1}><TheaterPictureInternal /></TabPanel>
      <TabPanel value={value} index={2}><TheaterPictureStage /></TabPanel>      
    </Box>
  );
}


export default function TheaterInfoPanel(){   
  
  const router = useRouter();
  const {Panel_Id} = router.query;
  const [theaterInfoTable, setTheaterInfoTable] = useState([
      {name: '공연장소', content: ''},
      {name: '공연장 객석 수', content: ''},
      {name: '공연장 크기', content: ''},
      {name: '특이사항', content: ''}
  ]);

  const [firstImage, setFirstImage] = useState();
  const [photosDrawing, setPhotosDrawing] = useState([]);
  const [photosInterior, setPhotosInterior] = useState([]);
  const [photosExterior, setPhotosExterior] = useState([]);
  const [photosStage, setPhotosStage] = useState([]);

  var obj = [...theaterInfoTable]; //state인 planInfoTable의 변경에 사용할 변수

  function getData(id){
    console.log('pageid',Panel_Id);
      Axios.post("/api/getTheaterInfo", {id} ).then((res) =>{
        //// 가져온 DB값으로 PlanInfoTable 변경 => ListViewTable props로 전달
        obj[0].content = res.data.users[0].theater_id;
        obj[1].content = res.data.users[0].theater_place;
        obj[2].content = res.data.users[0].theater_seatnumber
        obj[3].content = res.data.users[0].theater_size;
        obj[4].content = res.data.users[0].theater_drawing;
        obj[5].content = res.data.users[0].theater_exterior;
        obj[6].content = res.data.users[0].theater_interior;
        obj[7].content = res.data.users[0].theater_seatinformation;
        obj[8].content = res.data.users[0].theater_exception;
        obj[8].content = res.data.users[0].theater_addtime;

        setTheaterInfoTable(obj);

        //// 가져온 DB값으로 FirstImage 및 photos 변경 => <img> 및 ListViewPicture props로 전달 /////
        let ImglistDrawing = JSON.parse(res.data.users[0].theater_drawing);
        let PFDrawing =[];
        let ImglistExterior = JSON.parse(res.data.users[0].theater_exterior);
        let PFExterior =[];
        let ImglistInterior = JSON.parse(res.data.users[0].theater_interior);
        let PFInterior =[];
        let ImglistStage = JSON.parse(res.data.users[0].theater_seatinformation);
        let PFStage =[];
        
        /////파싱된 이미지 파일이름 배열을 react-Gallery 형식에 맞는 photosFormat로 변환 
        ImglistDrawing.map((photo)=>{
        photo = '/uploads/'+ photo;
        console.log('photo3',photo);
        PFDrawing.push({src:photo,width:3,height:3});
        })
        ImglistExterior.map((photo)=>{
        photo = '/uploads/'+ photo;
        console.log('photo3',photo);
        PFExterior.push({src:photo,width:3,height:3});
        })
        ImglistInterior.map((photo)=>{
        photo = '/uploads/'+ photo;
        console.log('photo3',photo);
        PFInterior.push({src:photo,width:3,height:3});
        })
        ImglistStage.map((photo)=>{
        photo = '/uploads/'+ photo;
        console.log('photo3',photo);
        PFStage.push({src:photo,width:3,height:3});
        });
        /////
        setPhotosDrawing(PFDrawing);
        setPhotosInterior(ImglistExterior);
        setPhotosExterior(PFInterior);
        setPhotosStage(PFStage);

        setFirstImage('/uploads/'+ ImglistDrawing[0]);  //대표이미지이름에 서버 저장경로 붙임.
      });
  }

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
                <div className={sty.layout_top_table}><TheaterInfoTable /></div>

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
                <div className={sty.layout_body_drawing}> <TheaterDrawing /> </div>
                <div>공연장 사진</div>
                <div className={sty.layout_body_picture}> <TheaterPicture /> </div>
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