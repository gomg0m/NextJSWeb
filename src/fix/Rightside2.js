import * as React from 'react';
import {useEffect} from 'react';
import styles from '../css/Rightside.module.css';
import { Box, Button, gridClasses} from '@mui/material';
import Axios from 'axios';

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

import {useStyles} from '../css/RightsideStyles';


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
  const [tabValue, setTabValue] = React.useState(1);  ///TabPanel 관련
  const [techComment, setTechComment] = React.useState([{}]);
  
    //Tabs Handle 
    const handleTabChange = (event, newValue) => {      
      setTabValue(newValue);
    };
  
    const calcHeight = 1020; ///??? 향후 관련 로직 추가 필요
    const RightHope_Id = 3; ///??? 향후 관련 로직 추가 필요
      //useEffect call func
    // func (Axios.pos(get))
    // get useState

  function getCommentTable(tableID){
      Axios.post("/api/getTechComment", {tableID}).then((res)=>{
          if (res.status == 200 )
          {

            let tmp_techcmt=[];

            res.data.users.map((item)=>{
              if(item.techcomment_image){
                //// techcomment_image를 일반 스트링 배열로 전환
                let parsedPhotos = JSON.parse(item.techcomment_image);
                let photosFormat =[];
              
              
                parsedPhotos.map((photo)=>{
                  photo = '/uploads/'+ photo;
                  photosFormat.push({src:photo,width:3,height:3});                        
                });    
                  tmp_techcmt.push({
                  id:item.techcomment_id, 
                  name: item.techcomment_name,
                  team: item.techcomment_team,
                  lasttime: item.techcomment_lasttime,
                  contents: item.techcomment_contents,
                  image: parsedPhotos,
                })                                  
              }
              else {
                tmp_techcmt.push({
                  id:item.techcomment_id, 
                  name: item.techcomment_name,
                  team: item.techcomment_team,
                  lasttime: item.techcomment_lasttime,
                  contents: item.techcomment_contents,
                  image: null,
                })                                                
              }            

            });
            setTechComment(tmp_techcmt);
            console.log('cmt', tmp_techcmt);              
          }//Eof res.status

      }); //Eof Axios
  }
  
  useEffect(()=>{    
    var id = props.tabID.RepleID;
    setTabValue(Number(props.tabID.TabID));
    getCommentTable(id);

  },[props.tabID.RepleID]);


  function onClickDiscussWrite (params){
    
    //1.새로운 의견을 Comment Table에 새로운 행으로 추가
    //Comment Table의 뒷자리수는 RepleID와 동일 
    let data = {...params, tableid: props.tabID.RepleID}
    Axios.post("/api/insertTechComments", {data}).then((res)=>{
      if (res.status == 200 )
      {
      }
    })
    //2. 다시 해당 Comment Table을 읽어와 리렌더링
    getCommentTable(props.tabID.RepleID)
  }

  return (
     
    <div className={styles.rightsidebox}>
      {/* <Paper sx={{width:680, height:[calcHeight], m:"0px 20px 0px"}} elevation={1}> */}
        <Box sx={{ width: '100%' }}>  {/*----- Tab 메뉴 -----*/}
          <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" >
              <Tab label={<span className={classes.customStyleOnTab}>연출정보</span>} {...a11yProps(0)}/> 
              <Tab label={<span className={classes.customStyleOnTab}>체크리스트</span>} {...a11yProps(1)} />
              <Tab label={<span className={classes.customStyleOnTab}>의견</span>} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>  {/*----- 연출정보 Tab 내용 -----*/}
              <ViewHopeInfoPanel Panel_Id = {RightHope_Id}/>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>  {/*----- 체크리스트 Tab 내용 -----*/}
              ... 공사중 : 체크리스트 페이지 
            </TabPanel>
          <TabPanel value={tabValue} index={2}>  {/*----- 의견 Tab 내용 -----*/}              
              <TechCommentWrite parentFunc={onClickDiscussWrite}/>

              {
                
                  techComment.map((item)=>(<TechCommentElement value={item}/>))
                
              }
            
          </TabPanel>      
        </Box>        
      {/* </Paper> */}
    </div>
  );

}
