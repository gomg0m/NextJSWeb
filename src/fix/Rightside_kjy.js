import * as React from 'react';
import {useEffect} from 'react';
import styles from '../css/Rightside.module.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';
import { Box, Button} from '@mui/material';

///// TabPanel 관련
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {makeStyles} from '@material-ui/core';
import {Paper} from '@mui/material';
/////

import ViewHopeInfoPanel from '../component/ViewHopeInfoPanel';
import TechCommentWrite from '../component/TechCommentWrite';
import TechCommentElement from '../component/TechCommentBox';

/////TabPanel 관련 
const useStyles = makeStyles({
  customStyleOnTab:{
    fontSize:'20px',
    color:'black',
    fontWeight: '700'

  },
  customStyleOnActiveTab:{
    color:'red'
  },
  activeTab:{
    fontSize:'16px',
    fontWeight:'600',
    color:'pink'
  },
  PanelText:{
    fontSize:'16px',
    color:'pink'
  }
})
 
TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.number.isRequired,
value: PropTypes.number.isRequired,
};

function TabPanel(props) {
const { children, value, index, ...other } = props;

return (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}      
    {...other}      
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);
}

function a11yProps(index) {
return {
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
};
}
/////


const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

export default function Rightside(props) {
  const [date, setDate] = React.useState(new Date());
  const classes = useStyles(); /////TabPanne CustomStyle 사용
  const [repleID, setRepleID] = React.useState(1);  ///TabPanel 관련
  const [value, setValue] = React.useState(1);  ///TabPanel 관련

  console.log ('props tabID', props.tabID.TabID);
  
    //Tabs Handle 
    const handleTabChange = (event, newValue) => {      
      
      setValue(newValue);
      console.log(value);
    };
  
    const calcHeight = 1020; ///??? 향후 관련 로직 추가 필요
    const HopeInfo_Id = 3; ///??? 향후 관련 로직 추가 필요
      //useEffect call func
    // func (Axios.pos(get))
    // get useState

  // function getCommentTable(tableID){
  //     Axios.post("/api/getTechComment", {tableID}).then((res)=>{
  //         if (res.status == 200 )
  //         {

  //         }//Eof res.status

  //     }); //Eof Axios
  // }
  useEffect(()=>{
    //getCommentTable(props.tableID);
    console.log("TechRiple Clicked", props.tabID.RepleID);
},[props.tabID.RepleID]);

  return (
     
    <div className={styles.rightsidebox}>
      <Paper sx={{width:680, height:[calcHeight], m:"0px 20px 0px"}} elevation={1}>
        <Box sx={{ width: '100%' }}>  {/*----- Tab 메뉴 -----*/}
          <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={Number(props.tabID.TabID)} onChange={handleTabChange} aria-label="basic tabs example" >
              <Tab label={<span className={classes.customStyleOnTab}>연출정보</span>} {...a11yProps(0)}/> 
              <Tab label={<span className={classes.customStyleOnTab}>체크리스트</span>} {...a11yProps(1)} />
              <Tab label={<span className={classes.customStyleOnTab}>의견</span>} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={Number(props.tabID.TabID)} index={0}>  {/*----- 연출정보 Tab 내용 -----*/}
              <ViewHopeInfoPanel Panel_Id = {HopeInfo_Id}/>
          </TabPanel>
          <TabPanel value={Number(props.tabID.TabID)} index={1}>  {/*----- 체크리스트 Tab 내용 -----*/}
              ... 공사중 : 체크리스트 페이지 
            </TabPanel>
          <TabPanel value={Number(props.tabID.TabID)} index={2}>  {/*----- 의견 Tab 내용 -----*/}
              ... 공사중 : 의견 페이지
              TechCommentWrite 
              TechCommentElement
          </TabPanel>      
        </Box>        
      </Paper>
    </div>
  );

}
