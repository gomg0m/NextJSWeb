import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {useStyles} from '../css/TableCSS';

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
      fontWeight: 'bold',
      textOverflow: 'ellipsis'
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
      minWidth: 580,
      fontSize: 16,  
      textOverflow: 'ellipsis'
    },
  }));

export default function ListViewTable(props) {
  const classes = useStyles();

    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>          
            {props.tableContents.map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell component="th" scope="row"  align="left"> {row.name} </StyledTableCell>
                <StyledTableCell2 align="left">{row.content}</StyledTableCell2>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
