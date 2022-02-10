import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside1(1)';
import sty from '../src/css/TheaterInfoPanel.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TheaterDrawing from '../src/component/TheatherDrawing';
import TheaterPicture from '../src/component/TheatherPicture';
import Axios from 'axios';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormInputText } from "../src/component/FormInputText";
import {FormInputMultilineText} from '../src/component/FormInputMultilineText'
import Router from 'next/router';

//정보 테이블 만들기
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
  
  function createData(name, content) {
    return { name, content };
  }
  
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
    
export default function TheaterInfoPanel(){       
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