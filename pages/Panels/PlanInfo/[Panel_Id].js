import React, { useState,useEffect, useCallback, useContext } from "react";
import Header from '../../../src/fix/Header';
import Leftside from '../../../src/fix/Leftside1';
import sty from '../../../src/css/TheaterInfoPanel.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useRouter } from "next/router";

import ListViewTable from '../../../src/component/ListViewTable';
import ListViewPicture from '../../../src/component/ListViewPicture';

import AppContext from "../../../src/component/AppContext";


/////=========== PlanInfoPanel 메인 페이지 ================================
export default function PlanInfoPanel(){ 
  const router = useRouter();
  const {Panel_Id} = router.query;
  const [planInfoTable, setPlanInfoTable] = useState([
    {name: '공연장르', content: ''},
    {name: '공연명', content: ''},
    {name: '공연시간', content: ''},
    {name: '공연횟수', content: ''},
    {name: '공연예산', content: ''},
    {name: '목표금액', content: ''},
    {name: '목표관객수', content: ''},
    {name: '공연내용', content: ''},
    {name: '공연특이사항', content: ''},
    {name: '대표이미지', content: ''},
  ]);
  const [photos, setPhotos] = useState([]);
  const [firstImage, setFirstImage] = useState();

  const globalPlanID = useContext(AppContext);


  var obj = [...planInfoTable]; //state인 planInfoTable의 변경에 사용할 변수

  
  function getData(id){
    console.log("globalPlanID",globalPlanID.state.statevar);
    
      Axios.post("/api/getPlanInfo", {id} ).then((res) =>{
        console.log("planInfo", res.data.users[0]);
        //// 가져온 DB값으로 PlanInfoTable 변경 => ListViewTable props로 전달
        obj[0].content = res.data.users[0].plan_genre;
        obj[1].content = res.data.users[0].plan_name;
        obj[2].content = res.data.users[0].plan_start
                          + " ~ " 
                          + res.data.users[0].plan_end 
                          + '( '+res.data.users[0].plan_time+' 시간)';
        obj[3].content = res.data.users[0].plan_number;
        obj[4].content = res.data.users[0].plan_budget;
        obj[5].content = res.data.users[0].goal_people;
        obj[6].content = res.data.users[0].goal_price;
        obj[7].content = res.data.users[0].plan_contents;
        obj[8].content = res.data.users[0].plan_exception;
        obj[9].content = res.data.users[0].plan_firstimage;

        setPlanInfoTable(obj);

        //// 가져온 DB값으로 FirstImage 및 photos 변경 => <img> 및 ListViewPicture props로 전달 /////
        let parsedPhotos = JSON.parse(res.data.users[0].plan_image);
        let photosFormat =[];
        
        /////파싱된 이미지 파일이름 배열을 react-Gallery 형식에 맞는 photosFormat로 변환 
        if(parsedPhotos){
          parsedPhotos.map((photo)=>{
            photo = '/uploads/'+ photo;
            console.log('photo3',photo);
            photosFormat.push({src:photo,width:3,height:3});
          });
          /////

          setPhotos(photosFormat);
          setFirstImage('/uploads/'+obj[9].content);  //대표이미지이름에 서버 저장경로 붙임.
        }
      });
  }

  useEffect(()=>{
    if(Panel_Id)
    {
     
      getData(Panel_Id);

    }

    }
  ,[Panel_Id]);
  
 
  return(
    <>
      <div className={sty.background}>
        <Header />
        <Leftside />
        
        <div className={sty.infoframe}>
            <div
                style={{
                    width: "1496px",
                    textAlign: "center",
                    borderBottom: "4px solid #EABB41",
                    lineHeight: "0.2em",
                    margin: "0px 0 20px",                    
                }}></div>
            <div className={sty.layout_top}>
                <div className={sty.top_title}>공연기획 정보</div>
                <div className={sty.top_subtitle}>공연기획 정보</div>
                <div className={sty.photobox}><img className={sty.photo} src={firstImage} alt="Map" width={1300} height={470}></img></div>

                <div className={sty.photos}><ListViewPicture photos={photos}/> </div>
                <div className={sty.layout_top_table}><ListViewTable tableContents={planInfoTable}/></div>

                <div
                    style={{
                        width: "1496px",
                        textAlign: "center",
                        borderBottom: "2px solid #aaa",
                        lineHeight: "0.2em",
                        margin: "40px 0 20px",
                    }}></div>
            <div className={sty.layout_body}>
                <div>첨부자료</div>
                <div className={sty.layout_body_picture}> <ListViewPicture photos={photos} /> </div>
            </div>
            <div className={sty.layout_bottom}>            
                <Link href="/About">    
                    <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}} variant="contained">  수정하기 </Button>
                </Link>    
            </div>
        </div>
      </div>
    </div> 
  </>               
  );
}