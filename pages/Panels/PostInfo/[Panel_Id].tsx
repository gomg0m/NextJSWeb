import React from 'react';
import Header from '../../../src/fix/Header';
import Leftside from '../../../src/fix/Leftside2(2)';
import Rightside from '../../../src/fix/Rightside2';
import sty from '../../../src/css/TechDiscussPanel.module.css';
import Link from 'next/link';
import HopePicture from '../../../src/component/HopePicture';
import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDropzone } from 'react-dropzone';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Input, IconButton, listSubheaderClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {FormInputDropdown} from '../../../src/component/FormInputDropdown';
import { FormInputMultilineText } from '../../../src/component/FormInputMultilineText';
import { FormInputText } from "../../../src/component/FormInputText";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



//=========유저가 리플 input할 수 있게======//
interface IFormInput {
  techreple_name: string,
  techreple_1stsubject: string,
  techreple_2ndsubject: string,
  techreple_contents: string,
  techreple_image: string
  }
  
  const defaultValues = {
  techreple_name: "",
  techreple_1stsubject:"",
  techreple_2ndsubject: "",
  techreple_contents: "",
  techreple_image: ""
};

///Dropzone에 사용할 변수
type Information = { src:string; width:number; height:number };

var pics = new Array<Information>(); 
var pic_count:number = 0 ;
var imgUploadFileList:string;

const baseStyle = {
  display : 'flex',
  align: 'center',
  padding: '2px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
  width: '300px',
  height: '40px',
  margin: "-10px 30px 0px",
  font: 'bold 0.7em/1em areal',
};

const activeStyle = {
  borderColor: '#2196f3'
};
  
const acceptStyle = {
  borderColor: '#00e676'
};
  
const rejectStyle = {
  borderColor: '#ff1744'
};

//---------------- Image File Drag&Drop Component ----------------
const ImgUpload = () => {

  const [thumb, setThumb] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  //--- 이미지 thumbnail의 Delete Icon Button의 이벤트 핸들러
  const deleteHandler =(index) =>{
      console.log("deleting index", index);
      //지워질 이미지 이름 저장.
      let delThumb = thumb[index];

      //이미지 스테이트에 들어있는 모든 이미지 이름을 복사해서
      // newThemb이라는 배열에 넣는다.
      let newThumb = [...thumb];

      //newThumb배열안에 있는 파일 이름 중 
      //클릭한 인덱스의 파일이름을 지워줌
      newThumb.splice(index, 1);

      //새로운 이미지 이름 배열인 newThumb으로
      //setThumb 해준다.
      setThumb(newThumb);
          
      ////미리 저장된 지워질 이미지을 Sever측에 삭제 요청 API를 호출한다.
      const data = "C:/Web/nextjsweb/public/uploads/"+ delThumb;
      console.log("deleting file", data);
          
      Axios.post("/api/deletefile", {data}).then((res)=>{
          if(res.status == 200){
          //login 성공
          console.log("파일삭제 결과", res.data.users);
          }
      });    
  }; //End Of deleteHandler

  //--- Dropzone Area Drop시의 이벤트 핸들러
  const onDrop = useCallback(
      acceptedFiles => {
          const formData = new FormData();
          const config = { headers: { "content-type": "multipart/form-data" } }

          acceptedFiles.forEach((file) => {        
              formData.append("file", file);
              console.log("acceptFilesNum",acceptedFiles);
          })

          {///let은 Block 내에서만 작용하기 떄문에 newThumb을 사용하려면 이렇게 빈 블럭구분을 사용해야 함.
              let newThumb = [...thumb]; 
              Axios.post<any>("/api/imgupload", formData, config).then((res) => {                 
                  setThumb([...thumb, ...res.data]);  
                  newThumb =[...thumb, ...res.data];
                  console.log("new thumb list", newThumb);
                  imgUploadFileList=JSON.stringify(newThumb);
                  console.log("imgUplist", imgUploadFileList);
              });    
          }
      }, [thumb]
  )
 
  //--- Dropzon Area 설정 및 작동 부분 
  const {getRootProps,getInputProps,isDragActive, isDragAccept,isDragReject} = useDropzone({onDrop,accept: 'image/jpeg, image/png', multiple:true});

  const style = useMemo(() => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
      }), 
      [
          isDragActive,
          isDragReject,
          isDragAccept
      ]
  );

  return (  
      <div style={{display:"flex"}}>
          <div>      
              <div {...getRootProps({style})} >    
                  <input {...getInputProps()} />
                  {
                      isDragActive ?
                      <p>여기에 드롭!</p> :
                      <p>첨부할 이미지를 드래그 또는 클릭하세요</p>         
                  }      
              </div>
          </div>
          <div style={{margin:"0px 15px 0px", display:"flex"}}>
              {thumb &&
                  thumb.map((item: string, index: number) => {
                      return (              
                          <div>                  
                              <img src={`/uploads/${item}`} height="50" alt="업로드이미지"></img>
                              <IconButton color="primary" aria-label="upload picture" component="span">
                                  <HighlightOffIcon onClick={()=> deleteHandler(index)}/>
                              </IconButton>                                    
                          </div>
                      );
                  })
              }
          </div>
      </div>  
  );
};//==================이미지 업로드 부분 끝!============================//






var kkk=0;
/////=========== TechDisucssInfoPanel 메인 페이지 ================================
export default function TechDiscussInfoPanel(){  
  
  //=================================유저가 의견(리플) '올리기 버튼 누르면 작동하는 onSubmit=====================================//
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  
  const [techRepleIds, setTechRepleIds] = useState([]);
  const [techRepleName, setTechRepleName] = useState([]);
  const [techRepleFirSubject, setTechrepleFirSubject] = useState([]);
  const [techRepleSecSubject, setTechrepleSecSubject] = useState([]);
  const [techRepleContents, setTechrepleContents] = useState([]);
  const [techRepleImage, setTechrepleImage] = useState([]);
  const [techRepleLastTime, setTechreplelastTime] = useState([]);
  const [rightsideTabID, setRightsideTabID] = useState({TabID:0, RepleID:1});

  //===========TECH 테이블에서 tech_discussname 가져오기============//
  const [techname, setTechname] = React.useState([]);
  const router = useRouter();
  const {Panel_Id} = router.query;

//=============아래 리플들 정보 갖고오는 부분=================//
   //★★★리플 박스 내용들
  const [TechRepleInfoTable, setTechRepleInfoTable] = useState([
    {name: '기술명', content: ''},
    {name: '검토주제', content: ''},
    {name: '세부주제', content: ''},
    {name: '검토내용', content: ''},
  ]);


  var obj = [...TechRepleInfoTable]; //state인 TechInfoTable의 변경에 사용할 변수

  const onSubmit = (data: IFormInput) => {
    data.techreple_image=imgUploadFileList; //Dropzone에서 등록된 image file list를 data에 추가함.
    console.log("Form data", data);
    let tableID;
    
    Axios.post("/api/insertTechRepleInfo", {data}).then((res)=>{  //TechReple 테이블에 새로운 행 추가
        if(res.status == 200){
            //login 성공
            console.log(res.data.users);
            Axios.get("/api/getLastTechRepleInfo").then((res)=>{ //추가된 행의 ID 값은 자동생성되므로 그 값을 얻기위해  최근 추가행의 값들을 다시 읽어옴.
                if(res.status == 200){
                    //login 성공
                    
                    tableID = res.data.users[0].techreple_id;
                    console.log("last techreple_id",tableID);
                    Axios.post("/api/createCommentTable",{tableID}).then((res)=>{ //추가된 행의 ID 값으로 TECHCOMMENT 테이블 생성
                        if(res.status == 200){
                            //login 성공
                            console.log("create comment success", res.data.users);
                        }
                    });
                    //1. 새로 생성된 techriple id를 techinfo 테이블의 techrple_ids에 추가하고 json techreple_ids 값으로 변환
                    let tmp_arrids =[...techRepleIds,String(tableID)];//기존 ids값에 새 id 추가
                    let tmp_jsids = JSON.stringify(tmp_arrids);

                    let data = {tech_id: Panel_Id , tech_repleids: tmp_jsids };
                    console.log("tmp_jsids",tmp_jsids );
                    //2. TechInfo의 ids update
                    Axios.post("/api/updateTechInfoids",{data}).then((res)=>{ 
                        if(res.status == 200){
                            //login 성공
                            console.log("updateTechInfoids", res.data.users);
                            //3. 새로 추가된 techriple을 리랜더링하기 위해 DB 다시 읽어들임.
                            getData(Panel_Id);
                        }
                    });

                }
            });
        }
    });
}
  
    function getTechData(){
        //console.log('페이지아이디',techname);
        Axios.get("/api/getTechInfo").then((res) => {                 
            if(res.status == 200){      
                res.data.users.map((item, i) => {
                    if(item.tech_id == Panel_Id){
                    setTechname(res.data.users[i].tech_discussname);
                }})
            }
        });    
    }
    
    useEffect(() => {
    getTechData();

}, [])




  function getData(id){
    console.log('pageid',Panel_Id);

    Axios.post("/api/getTechInfo", {id} ).then((res) => {
        if(res.status==200)
        {
          let parsedTechRepleList = JSON.parse(res.data.users[0].tech_repleids);
          console.log('parsedTechRepleList',parsedTechRepleList);
          let ids =[...parsedTechRepleList];
          console.log('ids',ids)
          setTechRepleIds(ids);
          
            Axios.post("/api/getTechRepleids", {ids} ).then((res) =>{
          
                if(res.status == 200){
                    //login 성공
                    console.log('res.data.users', res.data.users);
                    let techreplename=[];
                    let techreplefirsubject=[];
                    let techreplesecsubject=[];
                    let techreplecontents=[];
                    let techrepleimage=[];
                    let techreplelasttime=[];

                    res.data.users.map((item)=>{techreplename.push(item.techreple_name)});
                    res.data.users.map((item)=>{techreplefirsubject.push(item.techreple_1stsubject)});
                    res.data.users.map((item)=>{techreplesecsubject.push(item.techreple_2ndsubject)});
                    res.data.users.map((item)=>{techreplecontents.push(item.techreple_contents)});
                    res.data.users.map((item)=>{techrepleimage.push(JSON.parse(item.techreple_image))});
                    res.data.users.map((item)=>{techreplelasttime.push(item.techreple_lasttime)});

                    setTechRepleName(techreplename);
                    setTechrepleFirSubject(techreplefirsubject);
                    setTechrepleSecSubject(techreplesecsubject);
                    setTechrepleContents(techreplecontents);
                    setTechrepleImage(techrepleimage);
                    setTechreplelastTime(techreplelasttime);
    

                    console.log('name',techrepleimage);


                    //게시판 코멘트 부분 붙이기
                    // Axios.post("/api/getTechInfoComments", {id}).then((res)=>{
                    //     if(res.status == 200){
                    //         //login 성공
                    //         console.log(res.data.users);
                    //         let techfirstimg=[];
                    //         let techlasttime=[];
                    //         res.data.users.map((item)=>{techfirstimg.push(JSON.parse(item.tech_firstimage))});
                    //         res.data.users.map((item)=>{techlasttime.push(item.tech_lasttime)});
                    //         console.log('techimagelist',techfirstimg);                      
                    //         console.log('techlasttime',techlasttime);
                    //         setTechList(techfirstimg);                        
                    //         setTechLastTime(techlasttime);
                    //     }//if
                    // });
                }
            });//if2
        }})//if1
    }//function

  useEffect(()=>{
    if(Panel_Id) {
      getData(Panel_Id);
    }
  } ,[Panel_Id]);


  //========================불러오는 정보 끝========================//
  const options1 = [ "사전확인", "사업계획", "고려사항",  "대상물", "연출내용", "구현환경", "반입 및 설치" ];
  const options2 = [ "공연에서 차지하는 비중", "연출 영역(반경)", "동선",  "리프팅 높이", "이동 거리", "속도", "이동 시의 움직임" ];

  function handleDiscussButtonClick(e){    
      let rpID = techRepleIds[Number(e.currentTarget.id)];
    setRightsideTabID({TabID:2, RepleID:rpID});
  }

    return(
        <>
        <div className={sty.background}>
        <Header />
        <Leftside />
        <Rightside tabID={rightsideTabID} />

        <div className={sty.infoframe}>
            {/* 빨간색 선 */}
            <div
                style={{
                    width: "887px",
                    textAlign: "center",
                    borderBottom: "4px solid #DE6A6A",
                    lineHeight: "0.2em",
                    left: "364px",
                    top: "179px"                    
                }}></div>

            {/* 협의 완료 버튼 */}
            <div className={sty.techbutton}>    
                <Button className={sty.search} style={{margin:"30px 20px 0px"}} variant="contained">  검색 </Button>          
                <Button className={sty.finish} style={{margin:"30px 0px 0px"}} variant="contained">  협의 완료하기 </Button>
            </div>

            <div className={sty.layout_top}>
                <div className={sty.top_title}>기술구체화협의</div>
                <div className={sty.top_subtitle}>{techname} 기술구체화 협의</div>
                 {/* 회색 선 */}
                <div
                    style={{
                        width: "840px",
                        borderBottom: "1px solid #E0E0E0",
                        lineHeight: "0.2em",
                        margin: "30px 20px 0px",                    
                    }}> 
                </div>

                {/* 유저들의 의견 작성 추가 박스 */}
                
                <div className={sty.addreple}>
                    
                  <div className={sty.body_row1}>
                      <div className={sty.title}>기술명</div>
                      <div className={sty.inputbox} style={{width:"700px"}}><FormInputText name="techreple_name" control={control} label="기술명을 입력하세요."/></div>
                  </div>
                  <div className={sty.body_row2}>
                      <div className={sty.title}>검토내용</div>                     
                      <div className={sty.dropdown1} style={{width:"250px"}} ><InputLabel>검토 주제를 선택하세요</InputLabel><FormInputDropdown MenuList={options1} name="techreple_1stsubject" control={control} /></div>
                      <div className={sty.dropdown2} style={{width:"250px"}} ><InputLabel>세부 주제를 선택하세요</InputLabel><FormInputDropdown MenuList={options2} name="techreple_2ndsubject" control={control} /></div>
                      <div className={sty.inputbox2} style={{width:"700px"}} ><FormInputMultilineText name="techreple_contents" control={control} label="검토 내용을 입력하세요" /></div>   
                  </div>
                  <div className={sty.body_row3}>
                  <div className={sty.title}>대표 이미지</div>
                    <div style={{margin:"-20px 70px 0px"}}><ImgUpload /></div>
                  </div>
                  <Button className={sty.upload} style={{margin:"-40px 770px 0px"}} variant="contained" onClick={handleSubmit(onSubmit)} > 올리기 </Button>
                </div>
                <div
                    style={{
                        width: "840px",
                        borderBottom: "1px solid #E0E0E0",
                        lineHeight: "0.2em",
                        margin: "20px 20px 50px",                    
                    }}> 
                </div>
                
                {/* 유저의 의견들 나오는 구간 */}
               <div>
                {
                    techRepleName.map((item, i) => (
                        <div className={sty.contentbox} style={{margin:"0px 20px 20px"}}>                      
                            <div className={sty.boxsubject} style={{margin:"20px 20px 0px"}}>{techRepleFirSubject[i]} / {techRepleSecSubject[i]}</div>
                            <div className={sty.boxname} style={{margin:"20px 20px 0px"}}>{item}</div>
                            <div className={sty.boxcontents} style={{margin:"10px 20px 50px"}}>{techRepleContents[i]}</div>

                            <Button id={i} className={sty.comment} style={{margin:"0px 765px 10px"}} onClick={handleDiscussButtonClick} >의견</Button>
                        </div>  
                    )) }
                </div>


            </div>
        </div>
      </div>
    </>                
    );
}