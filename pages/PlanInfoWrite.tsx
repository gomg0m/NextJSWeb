import sty from '../src/css/planInfoWirte.module.css'
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { FormInputText } from "../src/component/FormInputText";
import { FormInputDatetimePicker } from "../src/component/FormInputDatetimePicker";
import {FormInputMultilineText} from '../src/component/FormInputMultilineText'
import {FormInputDropdown} from '../src/component/FormInputDropdown'
import Router from 'next/router';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside1';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton } from "@material-ui/core";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDropzone } from 'react-dropzone';
import Axios from "axios";

interface IFormInput {
plan_id: string;
plan_name: string;
plan_genre: string;
plan_start: string;
plan_end: string;
plan_image: string;
plan_time: string;
plan_number: string;
plan_budget: string;
goal_people: string;
goal_price: string;
plan_contents: string;
plan_exception: string;
plan_file: string;
}

const defaultValues = {
plan_id: "",
plan_name:"",
plan_genre: "",
plan_start: "",
plan_end: "",
plan_image:"",
plan_time: "",
plan_number: "",
plan_budget: "",
goal_people: "",
goal_price: "",
plan_contents: "",
plan_exception: "",
plan_file: "",

};

type Information = { src:string; width:number; height:number };

var pics = new Array<Information>(); 
var pic_count:number = 0 ;
  
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
        const data = "d:/Web_dev/nextjsweb/public/uploads/"+ delThumb;
        console.log("deleting file", data);
        
        Axios.post("/api/deletefile", {data}).then((res)=>{
        if(res.status == 200){
        //       //login 성공
            console.log("파일삭제 결과", res.data.users);
        }
        });    
        ////////

        ///MySQL에 지워진 파일을 반영한 이미지 파일이름 배열 데이터 저장    
        console.log("deleted 배열", newThumb);
        Axios.post("/api/jsonaccess", {newThumb}).then((res)=>{
        if(res.status == 200){
            //login 성공
            console.log("삭제후 DB결과",res.data.users);
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

                    /////MySQL에 Upload한 이미지 파일이름 배열 데이터 저장    
                    Axios.post("/api/jsonaccess", {newThumb}).then((res)=>{
                        if(res.status == 200){
                            //login 성공
                            console.log("Upload DB저장 결과", res.data.user);
                        }
                    });
                    /////
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
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        
        <div style={{display:"flex"}}>
        <div>      
            <div {...getRootProps({style})} >    
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>여기에 드롭!</p> :
                <p>파일 드래그 또는 클릭</p>         
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
                })}
                </div>
        </div>
        
    );



};



/////=========== PlanInfo 페이지 메인 =====================================
export const planInfoWirte = ()=> {
    let boxprops ={ width:400, height:150};
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue } = methods;

    const onSubmit = (data: IFormInput) => {
        Axios.post("/api/getuser", {data}).then((res)=>{
            if(res.status == 200){
                //login 성공
                console.log(res.data.users);
                Router.push("/PlanInfoPanel")
            }
        });
    }

    return(
        <div>
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
                <div className={sty.layout_top_txt1}>공연기획정보</div>
                <div className={sty.layout_top_txt2}>공연기획정보 작성</div>
                <div
                style={{
                    width: "840px",
                    textAlign: "center",
                    borderBottom: "2px solid #aaa",
                    lineHeight: "0.2em",
                    margin: "40px 0 20px",
                }}></div>

            </div>
            <div className={sty.layout_body}>
                <div className={sty.body_row1}>
                    <div className={sty.body_row_subitem1}>장르</div>
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><FormInputDropdown name="plan_genre" control={control} label="Text Input"/></div>
                </div>
                <div className={sty.body_row2}>
                    <div className={sty.body_row_subitem1}>공연명</div>                     

                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="plan_name" control={control} label="공연명을 입력하세요" /></div>
                </div>

                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}>공연예상일자</div>
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><FormInputDatetimePicker name="plan_start" control={control} label="시작일자"/></div>
                    <div style={{margin:"15px 0px 0px"}}>-</div>
                    <div style={{margin:"0px 40px 0px"}} ><FormInputDatetimePicker name="plan_end" control={control} label="종료일자"/></div>
                </div>

                <div className={sty.body_row4}>
                    <div className={sty.body_row_subitem1}>공연이미지</div>
                    <div style={{margin:"15px 0px 0px"}}> <ImgUpload /></div>                
                </div>
                <div className={sty.body_row5}>
                    <div className={sty.body_row_subitem1}>협업팀 초대</div>
                    <div className={sty.body_row_subitem2} style={{width:"300px", margin:"-15px 30px 0px"}} ><FormInputText name="member" control={control} label="협업팀 입력"/></div>
                    <div style={{display:"flex", width:"800px", justifyContent:"flex-start"}}>
                    </div>
                </div>
                <div className={sty.body_row6}>
                    <div className={sty.body_row_subitem1}>공연시간</div>
                    <div></div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="plan_time" control={control}label="공연시간을 입력하세요"/></div>                    
                    <div>분</div>

                </div>
                <div className={sty.body_row7}>
                    <div className={sty.body_row_subitem1}>공연횟수</div>
                    <div></div>                   
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="plan_number" control={control} label="공연횟수를 입력하세요"/></div>
                    <div>회</div>
                </div>
                <div className={sty.body_row8}>
                    <div className={sty.body_row_subitem1}>총 예산규모</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="plan_budget" control={control} label="총 예산규모를 입력하세요"/></div>
                    <div>천원</div>
                </div>
                <div className={sty.body_row9}>
                    <div className={sty.body_row_subitem1}>목표관객 수</div>

                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="goal_people" control={control} label="목표 관객수를 입력하세요"/></div>
                    <div>명</div>
                </div>
                <div className={sty.body_row10}>
                    <div className={sty.body_row_subitem1}>목표티켓가격</div>

                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="goal_price" control={control} label="목표하는 티켓가격을 입력하세요"/></div>
                    <div>원</div>
                </div>
                <div className={sty.body_row11}>
                    <div className={sty.body_row_subitem1}>공연구성 및 내용</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><FormInputMultilineText name="plan_contents" control={control} label="공연구성 및 내용을 작성하세요"/></div>
                </div>
                <div className={sty.body_row12}>
                    <div className={sty.body_row_subitem1}>특이사항</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><FormInputMultilineText name="plan_exception" control={control} label="기타 특이사항을 작성하세요"/></div>
                </div>
                <div className={sty.body_row13}>
                    <div className={sty.body_row_subitem1}>자료</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><FormInputMultilineText name="plan_file" control={control} label="기타 자료관련 내용을 작성하세요"/></div>
                </div>
            </div>
            <div className={sty.layout_bottom}>
                <Button className={sty.notosanskr_bold_black_24px} style={{margin:"0px 20px 0px"}} onClick={() => reset()} variant={"contained"} >  취소 </Button>
                <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}} onClick={handleSubmit(onSubmit)} variant={"contained"}>  저장하기 </Button>
            </div>
        </div>
      </div>
    );
}

export default planInfoWirte;