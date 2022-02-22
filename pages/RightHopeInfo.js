import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside2';
import sty from '../src/css/RightHopeInfo.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from 'axios';
import { Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Input, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';

//테이블 불러오기
import ListViewTable from '../src/component/ListViewTable';
import ListViewPicture from '../src/component/ListViewPicture';


/////=========== HopeInfoPanel 메인 페이지 ================================
export default function HopeInfoPanel(){

  const router = useRouter();
  const {Panel_Id} = router.query;

  //★★★연출기술테이블
  const [HopeInfoTable, setHopeInfoTable] = useState([
    {name: '희망연출명', content: ''},
    {name: '세부내용', content: ''},
    {name: '의도 및 기대효과', content: ''},
    {name: '특이사항 및 추가 참고사항', content: ''}
  ]);

    //★★★연출목표테이블
  const [HopeObjectiveTable, setHopeObjectiveTable] = useState([
    {name: '희망연출 시간', content: ''},
    {name: '예산 규모', content: ''}
  ]);

    //★★★연출기술테이블
    const [HopeTechTable, setHopeTechTable] = useState([
    {name: '희망연출기술명', content: ''},
    {name: '희망이유', content: ''},
    {name: '특이사항 및 추가 참고사항', content: ''}
  ]);

  const [photos, setPhotos] = useState([]);
  const [firstImage, setFirstImage] = useState();

  var obj1 = [...HopeInfoTable]; //state인 HopeInfoTable 변경에 사용할 변수
  var obj2 = [...HopeObjectiveTable]; //state인 HopeObjectiveTable 변경에 사용할 변수
  var obj3 = [...HopeTechTable]; //state인 HopeTechTable 변경에 사용할 변수

  function getData(id){
    console.log('pageid',Panel_Id);
      Axios.post("/api/getHopeInfo", {id} ).then((res) =>{
        if (res.status == 200) {
        //// 가져온 DB값으로 HopeInfoTable 변경 => ListViewTable props로 전달             
        obj1[0].content = res.data.users[0].hope_name;
        obj1[1].content = res.data.users[0].hope_content
        obj1[2].content = res.data.users[0].hope_intention;
        obj1[3].content = res.data.users[0].hope_exception;

        obj2[0].content = res.data.users[0].hope_time;
        obj2[1].content = res.data.users[0].hope_budget

        obj3[0].content = res.data.users[0].hope_tech;
        obj3[1].content = res.data.users[0].hope_reason
        obj3[2].content = res.data.users[0].hope_reference;

        
        setHopeInfoTable(obj1);
        setHopeObjectiveTable(obj2);
        setHopeTechTable(obj3);

        //// 가져온 DB값으로 FirstImage 및 photos 변경 => <img> 및 ListViewPicture props로 전달 /////
        let parsedPhotos = JSON.parse(res.data.users[0].hope_image);
        let photosFormat =[];

        /////파싱된 이미지 파일이름 배열을 react-Gallery 형식에 맞는 photosFormat로 변환 
        parsedPhotos.map((photo)=>{
          photo = '/uploads/'+ photo;
          console.log('photo:',photo);
          photosFormat.push({src:photo,width:3,height:3});
        });
        /////

        setPhotos(photosFormat);
        setFirstImage('/uploads/'+parsedPhotos[0]);  //대표이미지이름에 서버 저장경로 붙임.
      }
    }); 
      
  }
    useEffect(()=>{
      if(Panel_Id)
        { getData(Panel_Id); }
      }
      ,[Panel_Id]
      );

    return(
        <>

        <div className={sty.infoframe}>
            <div className={sty.layout_top}>
              <div className={sty.layout_top_txt1}>희망연출정보</div>
              {/* 희명연출정보 제목 가져오기 */}
              <div className={sty.layout_top_txt2}> {HopeInfoTable[0].content} </div>
              <div className={sty.layout_body_drawing} > <ListViewPicture photos={photos}/> </div>

            <div className={sty.layout_body}>
              <div className={sty.subtitle} style={{margin:"50px 0px 0px"}}>희망연출 내용</div>
              <div className={sty.layout_top_table} style={{margin:"20px 0px 0px"}}><ListViewTable tableContents={HopeInfoTable}/></div>
              <div className={sty.subtitle} style={{margin:"50px 0px 0px"}}>희망연출 목표</div>
              <div className={sty.layout_top_table} style={{margin:"20px 0px 0px"}}><ListViewTable tableContents={HopeObjectiveTable}/></div>
              <div className={sty.subtitle} style={{margin:"50px 0px 0px"}}>희망연출 기술</div>
              <div className={sty.layout_top_table} style={{margin:"20px 0px 0px"}}><ListViewTable tableContents={HopeTechTable}/></div>
            </div>            
            
            <div className={sty.button}>       
              <Button className={sty.notosanskr_bold_black_24px} style={{margin:"50px 20px 0px"}} variant="contained">  수정 </Button>          
              <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"50px 20px 0px"}} variant="contained">  논의 확정하기 </Button>
            </div>
        </div>
    </div>  
    </>              
    );
}