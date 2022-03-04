import React from 'react';
import Header from '../../../src/fix/Header';
import Leftside from '../../../src/fix/Leftside2(2)';
import Rightside from '../../../src/fix/Rightside3';
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
  prdtreple_name: string,
  prdtreple_1stsubject: string,
  prdtreple_2ndsubject: string,
  prdtreple_contents: string,
  prdtreple_image: string,
  prdtreple_lasttime: string
  }
  
  const defaultValues = {
    prdtreple_name: "",
    prdtreple_1stsubject:"",
    prdtreple_2ndsubject: "",
    prdtreple_contents: "",
    prdtreple_image: "",
    prdtreple_lasttime: ""
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
/////=========== ProductDisucssInfoPanel 메인 페이지 ================================
export default function ProductDiscussInfoPanel(){  
  
  //=================================유저가 의견(리플) '올리기 버튼 누르면 작동하는 onSubmit=====================================//
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  
  const [productRepleIds, setProductRepleIds] = useState([]);

  const [productRepleName, setProductRepleName] = useState([]);
  const [productRepleFirSubject, setProductRepleFirSubject] = useState([]);
  const [productRepleSecSubject, setProductRepleSecSubject] = useState([]);
  const [productRepleContents, setProductRepleContents] = useState([]);
  const [productRepleImage, setProductRepleImage] = useState([]);
  const [productRepleLastTime, setProductReplelastTime] = useState([]);
  const [rightsideTabID, setRightsideTabID] = useState({TabID:0, RepleID:1});

  //===========TECH 테이블에서 tech_discussname 가져오기============//
  const [productName, setProductName] = useState([]);
  const router = useRouter();
  const {Panel_Id} = router.query;

//=============아래 리플들 정보 갖고오는 부분=================//
   //★★★리플 박스 내용들
  const [productRepleInfoTable, setProductRepleInfoTable] = useState([
    {name: '제작명', content: ''},
    {name: '검토주제', content: ''},
    {name: '세부주제', content: ''},
    {name: '검토내용', content: ''},
  ]);


  var obj = [...productRepleInfoTable]; //state인 TechInfoTable의 변경에 사용할 변수

    const createProductDiscussInfo = async(idata)=>{
        try{
            const resProductRepleInfo = await Axios.post("/api/insertProductRepleInfo", {idata});  //PRODUCTREPLEINFO 테이블에 새로운 행 추가
            const resGetLastReple = await Axios.get("/api/getLastProductRepleInfo"); //추가된 행의 ID 값은 자동생성되므로 그 값을 얻기위해  최근 추가행의 값들을 다시 읽어옴.                   
            let tableID = resGetLastReple.data.users[0].prdtreple_id;
            console.log("last prdtreple_id",tableID);
            const resCreateCommentTable = await Axios.post("/api/createProductCommentTable",{tableID});//추가된 행의 ID 값으로 PROCUCTCOMMENT 테이블 생성
            //1. 새로 생성된 techriple id를 techinfo 테이블의 techrple_ids에 추가하고 json techreple_ids 값으로 변환
            let tmp_arrids =[...productRepleIds,String(tableID)];//기존 ids값에 새 id 추가
            let tmp_jsids = JSON.stringify(tmp_arrids);

            let data = {product_id: Panel_Id , product_repleids: tmp_jsids};
            console.log("tmp_jsids",data);
            //2. ProductInfo의 ids update
            const resUpdateProductInfoids = await Axios.post("/api/updateProductInfoids",{data});
            const resGetData = await updateProductRepleInfo(Panel_Id);
        }catch(error){
            console.log('Error>>',error);
        }

    }

    const getProductData = async () => {
        try{
            const res = await Axios.get("/api/getProductInfo");
            res.data.users.map((item, i) => {
                if(item.product_id == Panel_Id){ setProductName(res.data.users[i].product_discussname);}
            })        
        }catch(error){
            console.log('Error>>',error);
        }
    }
    
    useEffect(() => {  getProductData(); }, [])
    useEffect(()=>{ if(Panel_Id) { updateProductRepleInfo(Panel_Id); } } ,[Panel_Id]);
                                
    const onSubmit = (data: IFormInput) => {
        data.prdtreple_image=imgUploadFileList; //Dropzone에서 등록된 image file list를 data에 추가함.
        console.log("Form data", data);        
        createProductDiscussInfo(data);
        }
    
    async function updateProductRepleInfo(id){
      try{
        console.log('pageid',Panel_Id);
        const resGetProductInfo = await Axios.post("/api/getProductInfo", {id});
        if(resGetProductInfo.data.users[0].prodcut_repleids === undefined) {
            let parsedProductRepleList = JSON.parse(resGetProductInfo.data.users[0].product_repleids);
            console.log('parsedProductRepleList',parsedProductRepleList);
            let ids =[...parsedProductRepleList];
            console.log('ids',ids)
            setProductRepleIds(ids);

            const resGetProductRepleids = await Axios.post("/api/getProductRepleids", {ids})
            console.log('res.data.users', resGetProductRepleids.data.users);
            let productreplename=[];
            let productreplefirsubject=[];
            let productreplesecsubject=[];
            let productreplecontents=[];
            let productrepleimage=[];
            let productreplelasttime=[];

            resGetProductRepleids.data.users.map((item)=>{productreplename.push(item.prdtreple_name)});
            resGetProductRepleids.data.users.map((item)=>{productreplefirsubject.push(item.prdtreple_1stsubject)});
            resGetProductRepleids.data.users.map((item)=>{productreplesecsubject.push(item.prdtreple_2ndsubject)});
            resGetProductRepleids.data.users.map((item)=>{productreplecontents.push(item.prdtreple_contents)});
            resGetProductRepleids.data.users.map((item)=>{productrepleimage.push(JSON.parse(item.prdtreple_image))});
            resGetProductRepleids.data.users.map((item)=>{productreplelasttime.push(item.prdtreple_lasttime)});

            setProductRepleName(productreplename);
            setProductRepleFirSubject(productreplefirsubject);
            setProductRepleSecSubject(productreplesecsubject);
            setProductRepleContents(productreplecontents);
            setProductRepleImage(productrepleimage);
            setProductReplelastTime(productreplelasttime);

            console.log('img',productrepleimage);
        }                    
        else{
            console.log('No Reple')
        }
    }catch(error){
        console.log('Error>>',error);
    }
  }//function

 


  //========================불러오는 정보 끝========================//
  const options1 = [ "사전확인", "사업계획", "고려사항",  "대상물", "연출내용", "구현환경", "반입 및 설치" ];
  const options2 = [ "공연에서 차지하는 비중", "연출 영역(반경)", "동선",  "리프팅 높이", "이동 거리", "속도", "이동 시의 움직임" ];

  function handleDiscussButtonClick(e){    
    let rpID = productRepleIds[Number(e.currentTarget.id)];
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
                <div className={sty.top_title}>제작관련협의</div>
                <div className={sty.top_subtitle}>{productName} 제작관련 협의</div>
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
                      <div className={sty.title}>제작명</div>
                      <div className={sty.inputbox} style={{width:"700px"}}><FormInputText name="prdtreple_name" control={control} label="기술명을 입력하세요."/></div>
                  </div>
                  <div className={sty.body_row2}>
                      <div className={sty.title}>검토내용</div>                     
                      <div className={sty.dropdown1} style={{width:"250px"}} ><InputLabel>검토 주제를 선택하세요</InputLabel><FormInputDropdown MenuList={options1} name="prdtreple_1stsubject" control={control} /></div>
                      <div className={sty.dropdown2} style={{width:"250px"}} ><InputLabel>세부 주제를 선택하세요</InputLabel><FormInputDropdown MenuList={options2} name="prdtreple_2ndsubject" control={control} /></div>
                      <div className={sty.inputbox2} style={{width:"700px"}} ><FormInputMultilineText name="prdtreple_contents" control={control} label="검토 내용을 입력하세요" /></div>   
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
                    productRepleName.map((item, i) => (
                        <div className={sty.contentbox} style={{margin:"0px 20px 20px"}}>                      
                            <div className={sty.boxsubject} style={{margin:"20px 20px 0px"}}>{productRepleFirSubject[i]} / {productRepleSecSubject[i]}</div>
                            <div className={sty.boxname} style={{margin:"20px 20px 0px"}}>{item}</div>
                            <div className={sty.boxcontents} style={{margin:"10px 20px 50px"}}>{productRepleContents[i]}</div>

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