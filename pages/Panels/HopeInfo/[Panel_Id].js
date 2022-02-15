import React from 'react';
import Header from '../../../src/fix/Header';
import Leftside from '../../../src/fix/Leftside2';
import sty from '../../../src/css/HopeInfoPanel.module.css';
import Button from '@mui/material/Button';
import HopePicture from '../../../src/component/HopePicture';

//테이블들 생성
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
      color: '#4F4F4F',
      fontSize: 16,
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
      color: '#333333',
      minWidth: 980,
      fontSize: 16,    
    },
}));


function createData(name, content) {
    return { name, content };
}

function HopeTitle(){
  const [list, setList] = useState([
    {name: '희망연출명', content: ''}
  ]);

  var obj = 
    [
      {name: '희망연출명', content: ''}
    ];

    function getData(){
      Axios.get("/api/getHopeInfo").then((res) =>{
      obj[0].content = res.data.users[0].hope_name;

      setList(obj);
        });
    }
    useEffect(() => {
      getData();
    }, []);

    return (
      <span>
        {list[0].content}
      </span>
    );
}
  
function HopeInfoTable(){
  const [list, setList] = useState([
    {name: '희망연출명', content: ''},
    {name: '세부내용', content: ''},
    {name: '의도 및 기대효과', content: ''},
    {name: '특이사항 및 추가 참고사항', content: ''},
  ]);

  var obj = 
      [
        {name: '희망연출명', content: ''},
        {name: '세부내용', content: ''},
        {name: '의도 및 기대효과', content: ''},
        {name: '특이사항 및 추가 참고사항', content: ''},
    ];

    function getData(){
      Axios.get("/api/getHopeInfo").then((res) =>{
      obj[0].content = res.data.users[0].hope_name;
      obj[1].content = res.data.users[0].hope_content;
      obj[2].content = res.data.users[0].hope_intention;
      obj[3].content = res.data.users[0].hope_exception;
      
      setList(obj);
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
                    <StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
                    <StyledTableCell2 align="left">{row.content}</StyledTableCell2>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );       
}
  
function HopeObjectiveTable(){
const [list, setList] = useState([
    {name: '희망연출 시간', content: ''},
    {name: '예산 규모', content: ''},

  ]);

  var obj = 
      [
        {name: '희망연출 시간', content: ''},
        {name: '예산 규모', content: ''},
    ];

    function getData(){
      Axios.get("/api/getHopeInfo").then((res) =>{
        obj[0].content = res.data.users[0].hope_time;
        obj[1].content = res.data.users[0].hope_budget;
      
      setList(obj);
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
                    <StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
                    <StyledTableCell2 align="left">{row.content}</StyledTableCell2>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ); 
}

function HopeTechTable(){
  const [list, setList] = useState([
    {name: '희망연출기술명', content: ''},
    {name: '희망이유', content: ''},
    {name: '특이사항 및 추가 참고사항', content: ''},
  ]);

  var obj = 
      [
        {name: '희망연출기술명', content: ''},
        {name: '희망이유', content: ''},
        {name: '특이사항 및 추가 참고사항', content: ''},
    ];

    function getData(){
      Axios.get("/api/getHopeInfo").then((res) =>{

        obj[0].content = res.data.users[0].hope_tech;
        obj[1].content = res.data.users[0].hope_reason;
        obj[2].content = res.data.users[0].hope_reference;
      
      setList(obj);
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
                    <StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
                    <StyledTableCell2 align="left">{row.content}</StyledTableCell2>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ); 
}

export default function TheaterInfoPanel(){       
    return(
        <>
            <Header />
            <Leftside />
        <div className={sty.infoframe}>
            <div
                //빨강색 선
                style={{
                    width: "1496px",
                    textAlign: "center",
                    borderBottom: "4px solid #ff0000",
                    lineHeight: "0.2em",
                    margin: "0px 0 20px",                    
                }}>
              </div>

            <div className={sty.layout_top}>
                <div className={sty.layout_top_txt1}>희망연출정보</div>
                <div className={sty.layout_top_txt2}> <HopeTitle /></div>
                <div style={{margin:"50px 0px 0px"}}><HopePicture /></div>


            <div className={sty.layout_body}>
              <div className={sty.subtitle} style={{margin:"50px 0px 0px"}}>희망연출 기술</div>
                <div className={sty.layout_top_table} style={{margin:"20px 0px 0px"}}><HopeInfoTable /></div>
                <div className={sty.subtitle} style={{margin:"50px 0px 0px"}}>희망연출 목표</div>
                <div className={sty.layout_body_drawing} style={{margin:"20px 0px 0px"}}> <HopeObjectiveTable /> </div>
                <div className={sty.subtitle} style={{margin:"50px 0px 0px"}}>희망연출 기술</div>
                <div className={sty.layout_body_drawing} style={{margin:"20px 0px 0px"}}> <HopeTechTable /> </div>
            </div>            
            
            <div className={sty.button}>       
                <Button className={sty.notosanskr_bold_black_24px} style={{margin:"50px 20px 0px"}} variant="contained">  수정 </Button>          
                <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"50px 20px 0px"}} variant="contained">  논의 확정하기 </Button>
            </div>
        </div>
    </div>  
    </>              
    );
}