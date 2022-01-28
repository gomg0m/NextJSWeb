import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {makeStyles} from '@material-ui/core';
import TheaterPictureExternal from './TheaterphotosExternal';
import TheaterPictureInternal from './TheaterphotosInternal';
import TheaterPictureStage from './TheaterphotosStage';

function BasicPagination() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} />
      <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} disabled />
    </Stack>
  );
}

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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


export default function BasicTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label={<span className={classes.customStyleOnTab}>외관</span>} {...a11yProps(0)}/> 
          <Tab label={<span className={classes.customStyleOnTab}>내부</span>} {...a11yProps(1)} />
          <Tab label={<span className={classes.customStyleOnTab}>무대공간</span>} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}><TheaterPictureExternal /></TabPanel>
      <TabPanel value={value} index={1}><TheaterPictureInternal /></TabPanel>
      <TabPanel value={value} index={2}><TheaterPictureStage /></TabPanel>      
    </Box>
  );
}