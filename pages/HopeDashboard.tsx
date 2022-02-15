import React from 'react';
import Header from '../src/fix/Header';
import sty from '../src/css/Preproduction1.module.css';
import { Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Input, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Footer from "../src/fix/Footer";
import Leftside from '../src/fix/Leftside';
import Rightside from '../src/fix/Rightside';
// import { borderRadius } from '@mui/system';
import Link from 'next/link';
import Axios from 'axios';

import {Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material';
import cardsty from "../src/css/card.module.css"

import {FormInputDropdown} from '../src/component/FormInputDropdown'
import styles from '../src/css/Show.module.css';
import { Checkbox, FormControlLabel, Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, 
  FormControl, Select, TextField, Paper, InputBase, IconButton } from '@mui/material';
import Router from "next/router";
import SearchIcon from '@mui/icons-material/Search';
import DialogNewProject from "./DialogNewProject";


interface IFormInput {
  hope_id: string;
  hope_name: string;
  hope_image: string;
  hope_content: string;
  hope_intention: string;
  hope_exception: string;
  hope_time: string;
  hope_budget: string;
  hope_tech: string;
  hope_reason: string;
  hope_reference: string;
  hope_addtime: string;
  }
  
  const defaultValues = {
  hope_id: "",
  hope_name:"",
  hope_image: "",
  hope_content: "",
  hope_intention: "",
  hope_exception:"",
  hope_time: "",
  hope_budget: "",
  hope_tech: "",
  hope_reason: "",
  hope_reference: "",
  hope_addtime: ""
};

function Combo(){
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return(
  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">모든상태</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>계획중!!!!!!</MenuItem>
    <MenuItem value={20}>제작중</MenuItem>
    <MenuItem value={30}>종료</MenuItem>
  </Select>
  </FormControl>
  );
}


/////=========== Dashboard 메인 페이지 ================================
export default function HopeDashboard() {
  
  const [list, setList] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = ()=> setOpen(false);
  const [open, setOpen] = React.useState(false);

  function getData(){
      Axios.get("/api/getHopejects").then((res) =>{
        console.log("projects get data",res.data.users);
        setList(res.data.users);
    });
  }

  useEffect(()=>{getData();},[]);
  
  const btnHandler=()=>{console.log('btn clickted')};
  const cardHandler=(e)=>{
    console.log("e",e.target.attributes[3].value)
    let routeTarget = "/Panels/PlanInfo/"+ e.target.attributes[3].value;
    console.log("id", routeTarget);
    Router.push(routeTarget);
  };

  return (
    <>
      <Header />
      <Leftside />
      <Rightside />
        <Box className={styles.prebackground1} sx={{ width: 1026, height: '100%', backgroundColor: '#F6F7FB', }} />
        <div className={styles.presubtitle1}>희망연출정보</div>

        <Link href ='/HopeInfoWrite'>
          <Button className={styles.addinfobutton1} variant="contained">+ 새로운 연출정보 추가</Button>
        </Link>
        <div className={styles.order1}>최근 생성순</div>
        <div className={styles.order2}>모든상태</div>
      <Footer />
    </>
  );
}