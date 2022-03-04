import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside2';
import sty from '../src/css/HopeInfoWrite.module.css'
import ReadOnlyTextFields from '../src/component/readonlytext';
import Button from '@mui/material/Button';
import FormDialog2 from '../src/component/fileattachdialogbtn';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { FormInputText } from "../src/component/FormInputText";
import {FormInputMultilineText} from '../src/component/FormInputMultilineText'
import Router from 'next/router';
import { useState, useCallback, useEffect, useMemo } from "react";
import { useDropzone } from 'react-dropzone';
import { IconButton } from "@material-ui/core";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


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
    hope_firstimage: string;
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
    hope_addtime: "",
    hope_firstimage: ""
};

///Dropzone에 사용할 변수
type Information = { src:string; width:number; height:number };

var pics = new Array<Information>(); 
var pic_count:number = 0 ;
var imgUploadFile:string;
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

//---------------- 대표 이미지 File Drag&Drop Component ----------------
const ImgUpload = (props) => {

    const [thumb, setThumb] = useState<string>();
    const [progress, setProgress] = useState<number>(0);
  
    //--- 이미지 thumbnail의 Delete Icon Button의 이벤트 핸들러
    const deleteHandler =() =>{      
        
      //지워질 이미지 이름 저장.
        let delThumb = thumb;       
        setThumb("");
        
        ////미리 저장된 지워질 이미지을 Sever측에 삭제 요청 API를 호출한다.
        const data = "c:/Web/nextjsweb/public/uploads/"+ imgUploadFile;
        
        Axios.post("/api/deletefile", {data}).then((res)=>{
        if(res.status == 200){      
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
            })
  
             Axios.post<any>("/api/imgupload", formData, config).then((res) => {                 
                    setThumb(res.data); 
                    imgUploadFile=res.data;
                    console.log('res.data',res.data);
             });    
        }, [thumb])
   
    //--- Dropzon Area 설정 및 작동 부분 
    const {getRootProps,getInputProps,isDragActive, isDragAccept,isDragReject} = useDropzone({onDrop,accept: 'image/jpeg, image/png', multiple:false});
  
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
                  <p>{props.label} 파일 드래그 또는 클릭</p>         
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
                        <HighlightOffIcon onClick={()=> deleteHandler()}/>
                    </IconButton>                                    
                    </div>
                );
              })
            }
          </div>
      </div>    
    );
};


//---------------- 여러 이미지들 File Drag&Drop Component ----------------
const ImgsUpload = () => {

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
                    })
                }
            </div>
        </div>  
    );
};


/////=========== HopeInfoWrite 페이지 메인 ============================
export const HopeInfoWrite = () => {
    let boxprops ={ width:400, height:150};
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue } = methods;

    const onSubmit = (data: IFormInput) => {
        data.hope_firstimage=imgUploadFile; //Dropzone에서 등록된 image file list를 data에 추가함.
        data.hope_image=imgUploadFileList;
        console.log("Form data", data);
        Axios.post("/api/insertHopeInfo", {data}).then((res)=>{
            if(res.status == 200){
                //login 성공
                console.log(res.data.users);
                Axios.get("/api/insertHopeInfo").then((res)=>{
                    if(res.status == 200){
                        //login 성공
                        console.log("last hope_id", res.data.users);
                        let routname = 'Panels/HopeInfo/'+String(res.data.users[0].hope_id);
                        Router.push(routname);
                    }
                });
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
                    borderBottom: "4px solid #ff0000",
                    lineHeight: "0.2em",
                    margin: "0px 0px 20px",                    
                }}></div>

            <div className={sty.layout_top}>
                <div className={sty.top_title}>희망연출정보</div>
                <div className={sty.top_subtitle}>희망연출내용 작성</div>
                <div
                style={{
                    width: "840px",
                    textAlign: "center",
                    borderBottom: "2px solid #aaa",
                    lineHeight: "0.2em",
                    margin: "40px 30px 20px",
                }}></div>
            </div>

            <div className={sty.layout_body}>
                <div className={sty.body_row1}>
                    <div className={sty.body_title}>희망연출명</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 60px 0px"}} ><FormInputText name="hope_name" control={control} label="희망연출을 입력하세요"/></div>
                </div>
                <div className={sty.body_row2}>
                    <div className={sty.body_title}>대표이미지</div>
                    <div style={{margin:"15px 30px 0px"}}> <ImgUpload /></div>                    
                </div>
                <div className={sty.body_row2}>
                    <div className={sty.body_title} style={{width:"70px"}}>추가 참고 이미지들</div>
                    <div style={{margin:"15px 30px 0px"}}> <ImgsUpload /></div>                    
                </div>
                <div className={sty.body_row3}>
                    <div className={sty.body_title}>세부내용</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 80px 0px"}} ><FormInputText name="hope_content" control={control} label="세부 내용을 입력하세요"/></div>
                </div>
                <div className={sty.body_row4}>
                    <div className={sty.body_title}>의도 및 기대효과</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 30px 0px"}} ><FormInputText name="hope_intention" control={control} label="의도 및 기대효과를 입력하세요"/></div>
                </div>
                <div className={sty.body_row5}>
                    <div className={sty.body_title} style={{width:"90px"}}>특이사항 및 추가참고 사항</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 35px 0px"}} ><FormInputMultilineText name="hope_exception" control={control} label="특이사항 및 추가 참고사항을 입력하세요"/></div>
                </div>

                <div className={sty.middle_title} style ={{margin:"100px -10px 0px"}}>희망연출 목표</div>
                <div
                style={{
                    width: "840px",
                    textAlign: "center",
                    borderBottom: "2px solid #aaa",
                    lineHeight: "0.2em",
                    margin: "40px -10px 40px",
                }}></div>

                <div className={sty.body_row6}>
                    <div className={sty.body_title}>희망 연출 시간</div>
                    <div className={sty.body_row_subitem2} style={{width:"300px", margin:"0px 30px 0px"}} ><FormInputText name="hope_time" control={control} label="희망 연출 시간을 입력하세요"/></div>                    
                    <div className={sty.body_unit} style ={{margin:"15px -10px 0px"}}>분</div>
                </div>

                <div className={sty.body_row7}>
                    <div className={sty.body_title}>예산규모</div>
                    <div className={sty.body_row_subitem2} style={{width:"300px", margin:"0px 65px 0px"}} ><FormInputText name="hope_budget" control={control} label="예산 규모를 입력하세요"/></div>
                    <div className={sty.body_unit} style ={{margin:"15px -45px 0px"}}>천원</div>
                </div>

                <div className={sty.middle_title} style ={{margin:"100px -10px 0px"}}>희망연출 기술</div>
                <div
                style={{
                    width: "840px",
                    textAlign: "center",
                    borderBottom: "2px solid #aaa",
                    lineHeight: "0.2em",
                    margin: "40px -10px 40px",
                }}></div>

                <div className={sty.body_row8}>
                    <div className={sty.body_title}>기술분류</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 60px 0px"}} ><FormInputText name="hope_tech" control={control} label="희망 연출 기술을 입력하세요"/></div>
                </div>
                <div className={sty.body_row9}>
                    <div className={sty.body_title}>희망이유</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 60px 0px"}} ><FormInputText name="hope_reason" control={control} label="희망 이유를 입력하세요"/></div>
                </div>
                <div className={sty.body_row10}>
                    <div className={sty.body_title} style={{width:"90px"}}>특이사항 및 추가참고 사항</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 20px 0px"}} ><FormInputMultilineText name="hope_reference" control={control} label="특이사항 및 추가 참고사항을 입력하세요"/></div>
                </div>
            </div>

            <div className={sty.layout_bottom}>  
                <Button className={sty.finishbutton} color="inherit" onClick={() => reset()} variant={"contained"}>  취소 </Button>           
                <Button className={sty.finishbutton} style={{margin:"0px 20px 0px"}} color="primary" onClick={handleSubmit(onSubmit)} variant={"contained"}>  저장하기 </Button>  
            </div>
            
        </div>
      </div>
    );
}

export default HopeInfoWrite;