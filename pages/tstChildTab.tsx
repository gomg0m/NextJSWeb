import React, { useState, useEffect, useCallback } from "react";
import sty from '../src/css/TheaterInfoPanel.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useRouter } from "next/router";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {makeStyles} from '@material-ui/core';

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


export default function tstChild(props) {
  const [value, setValue] = React.useState(0);  ///TabPanel 관련
  const classes = useStyles(); /////TabPanne CustomStyle 사용
  //Tabs Handle 
  const handleChange = (event, newValue) => {
    console.log('vvv');
    setValue(newValue);
  };

    return(
                <div className={sty.layout_body_picture}> 
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={props.vv} onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label={<span className={classes.customStyleOnTab}>외관</span>} {...a11yProps(0)}/> 
                        <Tab label={<span className={classes.customStyleOnTab}>내부</span>} {...a11yProps(1)} />
                        <Tab label={<span className={classes.customStyleOnTab}>무대공간</span>} {...a11yProps(2)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={props.vv} index={0}>안녕</TabPanel>
                    <TabPanel value={props.vv} index={1}>내친구</TabPanel>
                    <TabPanel value={props.vv} index={2}>야</TabPanel>      
                  </Box>                
                </div>
    );
};
