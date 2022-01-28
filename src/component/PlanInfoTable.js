import * as React from 'react';
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
  createData('공연명','샤이니'),
  createData('공연예상일정', '2021.08.16 ~ 2021.09.16'),
  createData('공연시간', '120분'),
  createData('공연횟수', '5회'),
  createData('총 예산규모', '10,000만원'),
  createData('목표관객 수', '1,500명'),
  createData('목표티켓가격', '20,000만원'),
  createData('공연구성 및 내용','소속사 SM엔터테인먼트는 샤이니가 오는 4월 4일 [비욘드 라이브]를 통해 단독 콘서트를 온라인으로 개최한다고 밝혔다. 비욘드 라이브는 세계 최초 온라인 전용 유료 콘서트 브랜드로, 슈퍼엠을 시작으로 SM엔터테인먼트 소속 가수 다수가 이 플랫폼을 통해 단독 콘서트를 열었다.'),
  createData('특이사항', '공연자가 고소공포증이 있습니다. 음향 저작권 확인 해야합니다.'),
];


export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableBody>
          {rows.map((row) => (
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