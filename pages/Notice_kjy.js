import React from 'react';
import Header from '../src/fix/Header';
// import Left from '../src/fix/Leftside2';
// import styles from '../src/css/Notice.module.css';
 import { Box, Button } from '@mui/material';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
// import { styled } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import {useStyles} from '../src/css/NoticeCSS';
import TechCommentWrite from '../src/component/NoticeWrite_kjy';
import NoticeViewTable from '../src/component/NoticeViewTable';

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


function Notice() {
  
  // Modal Open/Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (data)=>{
    setOpen(data);
  }
  const [HopeInfoTable, setHopeInfoTable] = React.useState([
    {name: '희망연출명', content: ''},
    {name: '세부내용', content: ''},
    {name: '의도 및 기대효과', content: ''},
    {name: '특이사항 및 추가 참고사항', content: ''}
  ]); 

  const classes = useStyles();
  
  const onClickDiscussWrite = (params) => {
  //1.새로운 의견을 Comment Table에 새로운 행으로 추가
    //Comment Table의 뒷자리수는 RepleID와 동일 
    let data = {...params, tableid: props.tabID.RepleID}
    Axios.post("/api/insertTechComments", {data}).then((res)=>{
      if (res.status == 200 )
      {
         //2. 다시 해당 Comment Table을 읽어와 리렌더링
        getCommentTable(props.tabID.RepleID)
      }
    })
  }
  
  return (
    <div>
    <Header />
      <Box sx={{ width: '1496x', backgroundColor: '#E5E5E5', }}>
      <Box sx={{ width: '1296x', backgroundColor: '#FFFFFF', }}>
          <div className={classes.Tilte}>
            <div>공지사항</div>
            <div className={classes.Button}><Button variant="contained" onClick={handleOpen}>작성하기</Button></div>
          </div>
          <div className={classes.Table}><NoticeViewTable tableContents = {HopeInfoTable}/></div>
         
      </Box> 
      </Box> 
      <TechCommentWrite parentFunc={onClickDiscussWrite} open={open} onClose={handleClose}/>
    </div>
  );
}

export default Notice;
