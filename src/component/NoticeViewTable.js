import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableHead } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {useStyles} from '../css/NoticeCSS';
import Router from "next/router";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F8F8F8",
      color: "Black",
      fontSize: 16,
      fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: 'white',
      color: '#4F4F4F',
      fontSize: 16,
      fontWeight: 400,
      minWidth: 50,
      fontWeight: 'bold',
      textOverflow: 'ellipsis'
    },
  }));
  
  const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: 'white',
      color: '#333333',
      minWidth: 80,
      fontSize: 16,  
      textOverflow: 'ellipsis'
    },
  }));

export default function NoticeViewTable(props) {
 
  const today = String(new Date());
  const classes = useStyles();
  
  const handlerClicTableRow = (e)=>{
    let NoticeID = props.tableContents[e.currentTarget.id].id;
    Router.push('/Panels/NoticeInfo/'+String(NoticeID));
    
  }


    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>          
          <TableRow >
                <StyledTableCell width='750' align='center' component="th" scope="row"> 내용 </StyledTableCell>
                <StyledTableCell width='170' align="center">작성자</StyledTableCell>
                <StyledTableCell width='230' align="center">등록일</StyledTableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {
            props.tableContents.map((row, i) => (
              <TableRow id={i} key={i} onClick={handlerClicTableRow}>
                <StyledTableCell component="th" scope="row" align='left'>{row.title}</StyledTableCell>
                <StyledTableCell align="left"><span>{row.name}</span><span className={classes.Team}>{row.team}</span></StyledTableCell>
                <StyledTableCell align="left">{row.lasttime}</StyledTableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
