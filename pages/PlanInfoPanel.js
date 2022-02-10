import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside1';
import sty from '../src/css/TheaterInfoPanel.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import PlanInfoPicture from '../src/component/PlanphotosInfo';
import PlanFilePicture from '../src/component/PlanphotosFile';

//정보 테이블 만들기
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import Axios from 'axios';

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
  
  function PlanInfoTable() {
  
    const [list, setList] = useState([
      {name: '공연장르', content: ''},
      {name: '공연명', content: ''},
      {name: '공연시작시간', content: ''},
      {name: '공연종료시간', content: ''},
      {name: '공연이미지', content: ''},
      {name: '공연시간', content: ''},
      {name: '공연횟수', content: ''},
      {name: '공연예산', content: ''},
      {name: '목표금액', content: ''},
      {name: '목표관객수', content: ''},
      {name: '공연내용', content: ''},
      {name: '공연특이사항', content: ''},
      {name: '공연첨부파일', content: ''}
    ]);
  
    var obj = 
        [
        {name: '공연장르', content: ''},
        {name: '공연명', content: ''},
        {name: '공연예상일정', content: ''},
        {name: '공연시간', content: ''},
        {name: '공연횟수', content: ''},
        {name: '공연예산', content: ''},
        {name: '목표금액', content: ''},
        {name: '목표관객수', content: ''},
        {name: '공연내용', content: ''},
        {name: '공연특이사항', content: ''},
        {name: '공연첨부파일', content: ''}
      ];
  
     
    function getData(){
      Axios.get("/api/getPlanInfo").then((res) =>{
      obj[0].content = res.data.users[0].plan_genre;
      obj[1].content = res.data.users[0].plan_name;
      obj[2].content = res.data.users[0].plan_start + " ~ " + res.data.users[0].plan_end;
      obj[3].content = res.data.users[0].plan_time;
      obj[4].content = res.data.users[0].plan_number;
      obj[5].content = res.data.users[0].plan_budget;
      obj[6].content = res.data.users[0].goal_people;
      obj[7].content = res.data.users[0].goal_price;
      obj[8].content = res.data.users[0].plan_contents;
      obj[9].content = res.data.users[0].plan_exception;
      obj[10].content = res.data.users[0].plan_file;
  
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
              <TableRow key={row.plan_name}>
                <StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
                <StyledTableCell2 align="left">{row.content}</StyledTableCell2>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

export default function PlanInfoPanel(){       
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
                <div className={sty.layout_top_image}><img src="images/planPhoto1.png" alt="Map" width={1300}></img></div>

                <div className={sty.layout_body_drawing}> <PlanInfoPicture /> </div>
                {/* 테이블 만들기 -> PlanInfoTable*/}
                <div className={sty.layout_top_table}><PlanInfoTable /></div>

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