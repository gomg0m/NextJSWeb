import * as React from 'react';
import styles from '../css/Rightside.module.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';
import { Box, Button} from '@mui/material';
import Schedule from '../../pages/Schedule';
const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

export default function Rightside() {
  const [date, setDate] = React.useState(new Date());

  return (
    <div className={styles.rightsidebox}>
        <div className={styles.textsbox}>
          <div className={styles.illjung}>일정</div>
          <div className={styles.gongji} style={{cursor:'pointer'}}>공지사항</div>
          <div className={styles.library} style={{cursor:'pointer'}}>자료실</div>
        </div>
        <div><Schedule /></div>
        {/* <div className={styles.calender} sx={{ width: 432, height: 485}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider> 
        </div> */}

        <div className={styles.todaybox} >
          
            <div className={styles.todaytitle}>Today</div>
            <div className={styles.artist}>샤이니</div>
            <div className={styles.time}>10:30 - 11:30</div>
            <div className={styles.dis1}>기술 연출 아이데이션 회의</div>
            <div className={styles.dis2}>다수의 풍선 날리기 기술 구체화</div>
            <Button className={styles.gogasi} variant="contained" color='inherit'>게시글 바로가기</Button>
        </div>
    </div>
  );
}
