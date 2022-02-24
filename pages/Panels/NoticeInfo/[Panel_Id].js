import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import Axios from 'axios';
import Header from '../../../src/fix/Header';
import ListViewPicture from '../../../src/component/ListViewPicture';
import {useStyles} from '../../../src/css/NoticeInfoPanelCSS';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableHead } from "@mui/material";
import {Box, Button, Paper} from "@mui/material";

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

export default function NoticeInfoPanel(){
    
    const router = useRouter();
    const {Panel_Id} = router.query;
    
    const [photos, setPhotos] = useState([]);  //For image
    const [noticeInfoTable, setNoticeInfoTable] = useState( {title: '', name:'', team:'', lasttime:'', content: ''});
    const [files, setFiles] = useState([]);  //For image

    const classes = useStyles();

    var obj = {title: '', name:'', team:'', lasttime:'', content: ''};      

    function getData(id){
        
          Axios.post("/api/getNoticeInfo", {id} ).then((res) =>{
            if (res.status == 200) {
            //// 가져온 DB값으로 HopeInfoTable 변경 => ListViewTable props로 전달             
            obj.title = res.data.users[0].notice_title;
            obj.name = res.data.users[0].notice_name;
            obj.team = res.data.users[0].notice_team;
            obj.lasttime = res.data.users[0].notice_lasttime;    
            obj.content = res.data.users[0].notice_content;
            obj.file = res.data.users[0].notice_file;            
                    
            setNoticeInfoTable(obj);
    
            //// 가져온 DB값으로 FirstImage 및 photos 변경 => <img> 및 ListViewPicture props로 전달 /////
            let parsedPhotos = JSON.parse(res.data.users[0].notice_image);
            let photosFormat =[];
    
            /////파싱된 이미지 파일이름 배열을 react-Gallery 형식에 맞는 photosFormat로 변환 
            parsedPhotos.map((photo)=>{
              photo = '/uploads/'+ photo;
              console.log('photo:',photo);
              photosFormat.push({src:photo,width:3,height:3});
            });
            ////
            setPhotos(photosFormat);

            //// 가져온 DB값에서 files String 분리
            let parsedFiles = JSON.parse(res.data.users[0].notice_file);
            
            ////
            setFiles(parsedFiles);

        }
        }); 
          
      }

    useEffect(()=>{
        if(Panel_Id)
          { getData(Panel_Id); }
        }
        ,[Panel_Id]
    );

    const handleOpenList = ()=>{
        router.push("/Notice_kjy");
    }

    return (
    <>
      {/* <Header/> */}
        <div>
          <Box sx={{ position:'relative', width: '1496x', backgroundColor: '#E5E5E5', }}>
              <Box sx={{ width: '1296x', backgroundColor: '#FFFFFF', }}>
                <div>
                    <div style={{position:'relative', fontSize: '32px', fontWeight:'700', left:'30px', top:'40px'}}>공지사항</div>
                    {/* <div><Button className={classes.Button1} variant="contained" onClick={handleOpenList}>목록</Button></div> */}
                </div>
                <div style={{position:'relative', width:'1296px', left:'120px', top:'120px'}}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>          
                            <TableRow >
                                <StyledTableCell align="left">
                                    <div style={{position:'relative', fontSize: '24px', fontWeight:'700', left:'20px', top:'10px'}}>{noticeInfoTable.title}</div>
                                    <div style={{position:'relative', fontSize: '16px', fontWeight:'400', left:'1000px', top:'-10px'}}>{noticeInfoTable.lasttime}</div>
                                    <div><span style={{position:'relative', fontSize: '16px', fontWeight:'700', left:'20px', top:'0px'}}>{noticeInfoTable.name}</span>
                                    <span style={{position:'relative', fontSize: '16px', fontWeight:'700', left:'30px', top:'0px', backgroundColor:'magenta', color:'white',borderRadius:'5px'}}>{noticeInfoTable.team}</span></div>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow> <StyledTableCell component="th" scope="row" align='left'>{files}</StyledTableCell> </TableRow>
                            <TableRow>
                                <StyledTableCell align="left"> 
                                    <div>{noticeInfoTable.content}</div>
                                    { photos ? <div><ListViewPicture photos={photos}/> </div> : null }
                                </StyledTableCell>
                            </TableRow>              
                        </TableBody>
                        </Table>
                    </TableContainer>             
                    </div>
                </Box> 
            </Box> 
        </div>
    </>
    )
  
}