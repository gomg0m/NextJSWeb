import React, { useState,useEffect, useCallback } from "react";
import Header from '../../src/fix/Header';
import Leftside from '../../src/fix/Leftside1';
import sty from '../../src/css/TheaterInfoPanel.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';


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

import Axios from 'axios';
import { useRouter } from "next/router";

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

  function createData(name, content) {
    return { name, content };
  }
  
  const photos = [
    {
      src: "/images/OlympicHallDrawing1.png",
      width: 4,
      height: 3
    },
    {
      src: "/images/OlympicHallDrawing2.png",
      width: 1,
      height: 1
    },
    {
      src: "/images/OlympicHallDrawing3.png",
      width: 3,
      height: 4
    },
    {
      src: "/images/OlympicHallDrawing4.png",
      width: 3,
      height: 4
    },
  ];
  
function PlanInfoTable(props) {
 
    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>          
            {props.tableContents.map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
                <StyledTableCell2 align="left">{row.content}</StyledTableCell2>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


  
    
function PlanFilePicture(props) {
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



function PlanInfoPicture(props) {
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
        <Gallery photos={props.photos} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={props.photos.map((x) => ({
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



/////=========== PlanInfoPanel 메인 페이지 ================================
export default function PlanInfoPanel(){ 
  const router = useRouter();
  const {planInfoPanel_id} = router.query;
  const [planInfoTable, setPlanInfoTable] = useState([
    {name: '공연장르', content: ''},
    {name: '공연명', content: ''},
    {name: '공연시간', content: ''},
    {name: '공연횟수', content: ''},
    {name: '공연예산', content: ''},
    {name: '목표금액', content: ''},
    {name: '목표관객수', content: ''},
    {name: '공연내용', content: ''},
    {name: '공연특이사항', content: ''},
  ]);
  const [photos, setPhotos] = useState([]);
  const [firstImage, setFirstImage] = useState();

  var obj = [
    {name: '공연장르', content: ''},
    {name: '공연명', content: ''},
    {name: '공연시간', content: ''},
    {name: '공연횟수', content: ''},
    {name: '공연예산', content: ''},
    {name: '목표금액', content: ''},
    {name: '목표관객수', content: ''},
    {name: '공연내용', content: ''},
    {name: '공연특이사항', content: ''}
  ];

  function getData(id){
      Axios.post("/api/getPlanInfo", {id} ).then((res) =>{
        console.log(res.data.users);
        obj[0].content = res.data.users[0].plan_genre;
        obj[1].content = res.data.users[0].plan_name;
        obj[2].content = res.data.users[0].plan_start + " ~ " + res.data.users[0].plan_end + '( '+res.data.users[0].plan_time+' 시간)';
        obj[3].content = res.data.users[0].plan_number;
        obj[4].content = res.data.users[0].plan_budget;
        obj[5].content = res.data.users[0].goal_people;
        obj[6].content = res.data.users[0].goal_price;
        obj[7].content = res.data.users[0].plan_contents;
        obj[8].content = res.data.users[0].plan_exception;

        setPlanInfoTable(obj);
        let parsedPhotos = JSON.parse(res.data.users[0].plan_image);
        let photosFormat =[];
        
        /////파싱된 이미지 파일이름 배열을 react-Gallery 형식에 맞는 photosFormat로 변환 
        parsedPhotos.map((photo)=>{
          photo = '/uploads/'+ photo;
          console.log('photo3',photo);
          photosFormat.push({src:photo,width:3,height:3});
        });
        /////

        setPhotos(photosFormat);
        setFirstImage('/uploads/'+parsedPhotos[0]);  //대표이미지이름에 서버 저장경로 붙임.
      });
  }

  useEffect(()=>{
    if(planInfoPanel_id)
    {
     
      getData(planInfoPanel_id);

    }

    }
  ,[planInfoPanel_id]);
  
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
                <div className={sty.layout_top_txt1}>공연기획 정보</div>
                <div className={sty.layout_top_txt2}>공연기획 정보</div>
                <div className={sty.layout_top_image}><img src={firstImage} alt="Map" width={1300}></img></div>

                <div className={sty.layout_body_drawing}> <PlanInfoPicture photos={photos}/> </div>
                <div className={sty.layout_top_table}><PlanInfoTable tableContents={planInfoTable}/></div>

                <div
                    style={{
                        width: "1496px",
                        textAlign: "center",
                        borderBottom: "2px solid #aaa",
                        lineHeight: "0.2em",
                        margin: "40px 0 20px",
                    }}></div>
            <div className={sty.layout_body}>
                <div>첨부자료</div>
                <div className={sty.layout_body_picture}> <PlanFilePicture /> </div>
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