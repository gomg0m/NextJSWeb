import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
//import TableHead from '@mui/material/TableHead';
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

const rows = [
  createData('공연 장소', 'LG아트센터'),
  createData('공연장 객석수', "500석"),
  createData('공연장 크기', '10mx10mx10m (354㎥'),
  createData('특이사항', '공연장 전용 엘리베이터가 있습니다. 전용 엘리베이터를 타야합니다. 1층, 2층, 3층 자석이 각각 다르니 유의하시기 바랍니다. 비상대피 안내 숙지하시고, 18,19,20열은 중앙부에 공연의 특성에 따라 음향 조정장비가 설치될 수 있습니다.'),
];


export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableBody>
          {rows.map((row) => (
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