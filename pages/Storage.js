import React from 'react';
import styles from '../src/css/Storage.module.css';
import { Checkbox, FormControlLabel, Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, 
  FormControl, Select, TextField, Paper, InputBase, IconButton, Input, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "../src/fix/Header";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


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


function Storage() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className={styles.storagebackground1} sx={{ width: 1581, height: '100%', backgroundColor: '#F6F7FB', }} />
      <Box className={styles.storagebackground2} sx={{ width: 1496, height: 906, backgroundColor: 'white', }} />
      <Box className={styles.storagebackground3} sx={{ width: 1296, height: 63, backgroundColor: '#F8F8F8', borderTop: 2, borderBottom: 1 }} />

      <div className={styles.storageorder1}>최신순</div>
      <div className={styles.storageorder2}>이름순</div>
      <div className={styles.storageorder3}>전체</div>

      <div className={styles.storagetitle}>자료실</div>

      <div className={styles.searchinfo}>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 275, borderColor: 'black' }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="자료검색" inputProps={{ 'aria-label': 'search google maps' }} />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"> <SearchIcon /> </IconButton>
          </Paper>
      </div>

    
        <Card className={styles.storagecard1} sx={{ width: 196, height: 196}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="130"
            image="images/card1.png"
            alt="card1"
          />
          <CardContent>
            <Typography gutterBottom className={styles.storagecardtitle} component="div">
              기술구체화 협의 자료.jpeg
            </Typography>
            <Typography variant="body2" className={styles.storagecardsub}>
              2021-10-01   110.2KB
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default Storage;