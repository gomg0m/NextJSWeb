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

  //---------현재 공연 PLANINFO 테이블에서 제작과 관련된 ids 불러와 State변수(배열)에 저장 ------------------------
  const getPlanProductIDs = async (id) => {    
    
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
  //-------------------------------------------------------------------------------------------------------------


  //------------------- POSTINFO 테이블에서 제작 관련 id들을 읽어 State변수 갱신 --------------------------------------
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
  //-------------------------------------------------------------------------------------------------------------

  
  //------------------- 작성된 제작 협의를 POSTINFO에 추가하고 관련사항 PLANINFO 갱신 ---------------------------------------
  const createProductInfo = async(dialogdata:IDialogueNewProject) => { 
    //1. returned dialogdata => insertProductInfo : product_name, product_disccussname, product_hope, product_firstimage, prudct_lasttime
    //2. updateProductInfo() <-- get last product_id;inserted product_id 
    //3. post(inserted product_id) => updatePlaninfoProductids : plan_productids    
    try {
      dialogdata.prj_lasttime = String(new Date());  
      //1. insert product info.
      const resInsertProduct = await Axios.post("/api/insertProductInfo", {dialogdata}); //1. 작성 내용 제작테이블에 삽입
      //2. get last index
      const resGetProduct = await Axios.get("/api/getProductInfo");  //2. 삽입된 제작테이블 다시읽어 들이고
      let newids = [...productids, String(resGetProduct.data.users[resGetProduct.data.users.length-1].product_id)];  //3.삽입된 id를 ids에 추가하고
      setProductIDs(newids);
      const resProductID = await updateProductInfo(newids);  //4. 추가된 ids로 제작테이블을 다시읽어들이고
      let snewids = JSON.stringify(newids);    //5. PLANINFO 테이블의 해당 id의 post_ids 갱신을 위해 JSON형식으로 바꾸고
      let data = {plan_id:gValue.state.planID, plan_productids:snewids};
      const resUpdatePlanids = await Axios.post("/api/updatePlaninfoProductids", {data}); //6.PLANINFO의 해당 plan_id와 JSON ids를 넘겨 PLANINFO 갱신    
    }catch(error){
      console.log("Error >>", error); 
    }
  }
  //---------------------------------------------------------------------------------------------------------------------



  // USEEFFECT! 페이지 진입 초기화 ===========================================================
  useEffect(()=>{  
    getPlanProductIDs(gValue.state.planID).then((result)=>{    
      updateProductInfo(result);
    });
  },[]);
  //=========================================================================================
  
  const btnHandler=()=>{console.log('btn clickted')};

  
  //-----------------------------제작 카드 클릭 이벤트 핸들러 : 해당 제작 판넬 페이지로 이동 --------------------------------
  const cardHandler = (e)=>{  
    let routeTarget = "/Panels/ProductInfo/"+ e.currentTarget.id;
    Router.push(routeTarget);
  };
  //---------------------------------------------------------------------------------------------------------------------


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