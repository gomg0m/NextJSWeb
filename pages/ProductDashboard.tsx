import React, { useState,useEffect,useContext } from 'react';
import Leftside from '../src/fix/Leftside2(2)';
import Header from '../src/fix/Header';
import styles from '../src/css/TechDashboard.module.css';
import { Box, Button, Typography} from '@mui/material';
import Axios from 'axios';
import Router from "next/router";
import NewProductProject from "../src/component/popupProductWrite";
import {Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material';
import cardsty from "../src/css/card2.module.css"
import AppContext from "../src/component/AppContext";

//모달 디자인
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


interface IDialogueNewProject {  
  prj_discussname: string,
  prj_contents: string,
  prj_firstimage: string,
  prj_lasttime: string,  
}

/////=========== Dashboard 메인 페이지 ============================/////
export default function ProductDashboard() {
  //상태버튼
  const [techInfoState, setTechInfoState] = useState("협의대기");

  // Modal Open/Close
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [productids, setProductIDs] = useState([])
  const gValue = useContext(AppContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const getPlanProductIDS = async (id) => {    
    
    try{
      const response = await Axios.post("/api/getPlanInfo", {id} );
      let ids = [];
      ids = JSON.parse(response.data.users[0].plan_productids); 
      setProductIDs(ids);
      return ids;

    } catch(error){
      console.log("Error >>", error);
    }
    
  }

  const updateProductInfo = async (ids) => {
    //1. post(global palnId)=> getPlanInfo 
    //2. plan_productids parsing
    //3. post(productids) => getProductIds
    //4. setList
   try{
      const response = await Axios.post("/api/getProductInfoids", {ids});      
      setList(response.data.users);      
      return response.data.users[response.data.users.length-1].product_id; //last product_id    
    }catch(error){
      console.log("Error >>", error);      
    }
  }

  const updatePlanInfoProductids = async(data) => {
    
  }

  const createProductInfo = async(dialogdata:IDialogueNewProject) => { 
    //1. returned dialogdata => insertProductInfo : product_name, product_disccussname, product_hope, product_firstimage, prudct_lasttime
    //2. updateProductInfo() <-- get last product_id;inserted product_id 
    //3. post(inserted product_id) => updatePlaninfoProductids : plan_productids    
    try {
      dialogdata.prj_lasttime = String(new Date());  
      //1. insert product info.
      const resInsertProduct = await Axios.post("/api/insertProductInfo", {dialogdata});
      //2. get last index
      const resGetProduct = await Axios.get("/api/getProductInfo");
      let newids = [...productids, String(resGetProduct.data.users[resGetProduct.data.users.length-1].product_id)];      
      setProductIDs(newids);
      const resProductID = await updateProductInfo(newids);
      let snewids = JSON.stringify(newids);
      let data = {plan_id:gValue.state.planID, plan_productids:snewids};
      const resUpdatePlanids = await Axios.post("/api/updatePlaninfoProductids", {data});    
    }catch(error){
      console.log("Error >>", error); 
    }
  }

useEffect(()=>{  
  getPlanProductIDS(gValue.state.planID).then((result)=>{    
    updateProductInfo(result);
  });
  
},[]);

const btnHandler=()=>{console.log('btn clickted')};

//카드 누르면 해당 페이지로 이동
const cardHandler = (e)=>{  
  let routeTarget = "/Panels/ProductInfo/"+ e.currentTarget.id;
  Router.push(routeTarget);
};



function handleDialogData(dialogdata:IDialogueNewProject){  //----------------------- popupModal 처리 -------------
    createProductInfo(dialogdata);
} //-----------------------------------------------------------------------------------------------------------------
  
  return (
    <>
      <Header />
      <Leftside />

      <div> 
        <Box className={styles.prebackground} sx={{ width: 1550, height: '150%', backgroundColor: '#F6F7FB', }} />
        <div className={styles.presubtitle}>제작 공간</div>

        <Button className={styles.addmeetingbutton} variant="contained" onClick={handleOpen}>+ 새로운 제작관련 협의 추가</Button>
        <NewProductProject style={{margin:"0px 30px 0px"}} open={open} close={handleClose} getdialogdata={handleDialogData}/>

        {/* =========카드 나오기========== */}
        <div className={cardsty.card_container} style= {{ position:"absolute", top:"220px", overflow:"auto", width:"1470px", height:"350px"}} >
          { 
            list.map((item)=>(
              <Card className={cardsty.card_item} sx={{ minWidth: 356, minHeight: 300}} >
                <CardActionArea>
                  <CardActions>
                    <CardMedia
                      component="img"
                      height="150"
                      image={'/uploads/'+item.product_firstimage}                      
                      onClick={cardHandler}
                      id={item.product_id}
                    />
                  </CardActions>
                </CardActionArea>

                <CardContent>
                  <Typography className={cardsty.title} component="div">
                    {item.product_discussname}
                  </Typography>
                  <Typography className={cardsty.subtitle} component="div">
                    {item.product_hope}
                  </Typography>
                  <Button className={styles.discbutton}>협의 진행하기</Button>
                </CardContent> 
              </Card>
            )) 
          }
        </div>

       

      </div>
    </>
  );
}