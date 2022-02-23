import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "lightblue",
      color: theme.palette.primary.white,
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: 'whitesmoke',
      color: '#4F4F4F',
      fontSize: 16,
      minWidth: 250,
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
      textOverflow: 'ellipsis'
    },
  }));

export default function NoticeViewTable(props) {
 
    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>          
          <TableRow key="kkk">
                <StyledTableCell component="th" scope="row"> 내용 </StyledTableCell>
                <StyledTableCell align="left">작성자</StyledTableCell>
                <StyledTableCell align="left">등록일</StyledTableCell>
              </TableRow>
            {props.tableContents.map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
                <StyledTableCell align="left">{row.content}</StyledTableCell>
                <StyledTableCell align="left">{row.content}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
