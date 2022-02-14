import React, { useState, useEffect, useCallback } from "react";
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside1(1)';
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

//정보 테이블 만들기
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import { useRef} from "react";

export function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = e => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth"
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "lightblue",
      color: theme.palette.primary.white,
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: 'whitesmoke',
      color: 'gray',
      fontSize: 22,
      minWidth: 200,
      fontWeight: 'bold'
    },
  }));
  
  
  const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "lightblue",
      color: theme.palette.primary.white,
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: 'white',
      color: 'black',
      fontSize: 20,    
    },
  }));

  const photos = [
    {
      src: "images/OlympicHallDrawing1.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallDrawing2.png",
      width: 1,
      height: 1
    },
    {
      src: "images/OlympicHallDrawing3.png",
      width: 3,
      height: 4
    },
    {
      src: "images/OlympicHallDrawing4.png",
      width: 3,
      height: 4
    },
  ];

  const photos1 = [
    {
      src: "images/OlympicHallInternal1.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal2.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal3.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal4.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal5.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal6.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal7.png",
      width: 4,
      height: 3
    },

    {
      src: "images/OlympicHallInternal4.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal5.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal6.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal7.png",
      width: 4,
      height: 3
    },
    
  ];
  
  const photos2 = [
    {
      src: "images/OlympicHallExternal1.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallExternal2.png",
      width: 1,
      height: 1
    },
    {
      src: "images/OlympicHallExternal3.png",
      width: 3,
      height: 4
    },
    {
      src: "images/OlympicHallExternal4.png",
      width: 3,
      height: 4
    },
  ];
  
  const photos3 = [
    {
      src: "images/OlympicHallStage1.png",
      width: 0.4,
      height: 0.3
    },
    {
      src: "images/OlympicHallStage2.png",
      width: 0.1,
      height: 0.1
    },
    {
      src: "images/OlympicHallStage3.png",
      width: 0.3,
      height: 0.4
    },
    {
      src: "images/OlympicHallStage4.png",
      width: 0.4,
      height: 0.3
    },
    {
      src: "images/OlympicHallStage5.png",
      width: 0.1,
      height: 0.1
    },
    {
      src: "images/OlympicHallStage6.png",
      width: 3,
      height: 4
    },
    {
      src: "images/OlympicHallStage7.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallStage8.png",
      width: 1,
      height: 1
    },
    {
      src: "images/OlympicHallStage9.png",
      width: 3,
      height: 4
    },
    {
      src: "images/OlympicHallStage10.png",
      width: 3,
      height: 4
    },
  ];
      

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
  
  function TheaterInfoTable() {
  
    const [list, setList] = useState([
      {name: '공연장소', content: ''},
      {name: '공연장 객석 수', content: ''},
      {name: '공연장 크기', content: ''},
      {name: '특이사항', content: ''}
    ]);
  
    var obj = [
      {name: '공연장소', content: ''},
      {name: '공연장 객석 수', content: ''},
      {name: '공연장 크기', content: ''},
      {name: '특이사항', content: ''}
    ];
  
    function getData(){
      Axios.get("/api/getTheaterInfo").then((res) =>{
      obj[0].content = res.data.users[0].hall_place;
      obj[1].content = res.data.users[0].hall_seatnumber + "석";
      obj[2].content = res.data.users[0].hall_size + "㎡" ;
      obj[3].content = res.data.users[0].hall_exception;
  
      setList( obj );
      });
    }

      useEffect(() => {
        getData();
      }, []);
  
    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>
            {list.map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell2 align="left">{row.content}</StyledTableCell2>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


  
function TheaterDrawing() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div >
      <Gallery direction={"row"} photos={photos3} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos3.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}


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

function TheaterPicture() {
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




 
function TheaterPictureInternal() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
  
    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, []);
  
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };
    
    return (
      <div>
        <Gallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }


function TheaterPictureExternal() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
  
    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, []);
  
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };
    
    return (
      <div>
        <Gallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }


 
function TheaterPictureStage() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
  
    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, []);
  
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };
    
    return (
      <div>
        <Gallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }  

export default function TheaterInfoPanel(){    
  const scrollRef = useHorizontalScroll();  

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
                {/* 테이블 만들기 -> TheaterInfoTable */}
                <div className={sty.layout_top_table}><TheaterInfoTable /></div>

                <div
                    style={{
                        width: "1496px",
                        textAlign: "center",
                        borderBottom: "2px solid #aaa",
                        lineHeight: "0.2em",
                        margin: "40px 0 20px",
                    }}></div>
            <div className={sty.layout_body} >
                <div>공연장 도면</div>
                <div className={sty.layout_body_drawing} style={{ overflow: "auto", width:"1450px", height:"250px" }}> <TheaterDrawing /> </div>
                <div>공연장 사진</div>
                <div className={sty.layout_body_picture} style={{ overflow: "auto", width:"1450px", height:"250px" }}> <TheaterPicture /> </div>
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
