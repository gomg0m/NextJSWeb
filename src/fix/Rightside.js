import * as React from 'react';
import styles from '../css/Rightside.module.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';

const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

export default function Rightside() {
  const [date, setDate] = React.useState(new Date());

  return (
    <div className={styles.rightsidebox}>
        <div className={styles.scheduletext}>일정</div>
        
           <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider> 
        
        

    </div>
  );
}
