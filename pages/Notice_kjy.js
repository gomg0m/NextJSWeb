import React, {useEffect} from 'react';
import Header from '../src/fix/Header';
 import { Box, Button } from '@mui/material';
import {useStyles} from '../src/css/NoticeCSS';
import NoticeInfotWrite from '../src/component/NoticeWrite_kjy';
import NoticeViewTable from '../src/component/NoticeViewTable';
import Axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 816,
  height: 666,
  bgcolor: 'background.paper',
  border: '1px solid #E0E0E0',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};


export default function NoticeView() {
  
  // Modal Open/Close
  const [open, setOpen] = React.useState(false);

  const [noticeInfo, setNoticeInfo] = React.useState([{}]);  //화면에 표시할 Table 내용

  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = (openstate) => {
    let data = openstate;
    setOpen(data);
  }

  function getNoticeTable(){
    Axios.get("/api/getNoticeInfo").then((res)=>{
        if (res.status == 200 )
        {

          let tmp_noticecmt=[];

          res.data.users.map((item)=>{
            if(item.notice_image){  //Null이 아니면
              //// techcomment_image를 일반 스트링 배열로 전환
              let parsedPhotos = JSON.parse(item.notice_image);
              let photosFormat =[];
            
            
              parsedPhotos.map((photo)=>{
                photo = '/uploads/'+ photo;
                photosFormat.push({src:photo,width:3,height:3});                        
              });    
              tmp_noticecmt.push({
                id:item.notice_id, 
                name: item.notice_name,
                team: item.notice_team,
                title: item.notice_title,
                lasttime: item.notice_lasttime,
                contents: item.notice_content,
                image: parsedPhotos,
              })                                  
            }
            else {
              tmp_noticecmt.push({
                id:item.notice_id, 
                name: item.notice_name,
                team: item.notice_team,
                title: item.notice_title,
                lasttime: item.notice_lasttime,
                contents: item.notice_content,
                image: null,
              })                                                
            }            

          });
          setNoticeInfo(tmp_noticecmt);
          console.log('cmt', tmp_noticecmt);              
        }//Eof res.status

    }); //Eof Axios

}
  const onClickNoticeWrite = (params) => {
  //1.새로운 의견을 Comment Table에 새로운 행으로 추가
    //Comment Table의 뒷자리수는 RepleID와 동일 
    let data = {...params}
    Axios.post("/api/insertNoticeInfo", {data}).then((res)=>{
      if (res.status == 200 )
      {
        console.log("Inserted Notice")
         //2. 다시 해당 Comment Table을 읽어와 리렌더링
        getNoticeTable()
      }
    })
  }
  
  useEffect(()=>{
    getNoticeTable()
  },[])

  return (
    <div className={classes.Page}>
    <Header />
      <Box sx={{ width: '1496x', backgroundColor: '#E5E5E5', }}>
      <Box sx={{ width: '1296x', backgroundColor: '#FFFFFF', }}>
          <div className={classes.Tilte}>
            <div>공지사항</div>
            <div className={classes.Button}><Button variant="contained" onClick={handleOpen}>작성하기</Button></div>
          </div>
          <div className={classes.Table}><NoticeViewTable tableContents = {noticeInfo}/></div>
         
      </Box> 
      </Box> 
        <NoticeInfotWrite parentFunc={onClickNoticeWrite} open={open} onClose={handleClose}/>
    </div>
  );
}


