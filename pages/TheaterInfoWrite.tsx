import React, {useState, useCallback, useMemo, useEffect} from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside1(1)';
import sty from '../src/css/TheaterInfoWrite.module.css';
import IconButton from '../src/component/withiconbtn';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { FormInputText } from "../src/component/FormInputText";
import { FormInputMultilineText } from '../src/component/FormInputMultilineText'
import Router from 'next/router';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDropzone } from 'react-dropzone';

interface IFormInput {
    concerthall_id: string;
    hall_place: string;
    hall_seatnumber: string;
    hall_size: string;
    hall_blueprint: string;
    hall_exterior: string;
    hall_interior: string;
    hall_seatinformation: string;
    hall_exception: string;
    }
    
    const defaultValues = {
    concerthall_id: "",
    hall_place:"",
    hall_seatnumber: "",
    hall_size: "",
    hall_blueprint: "",
    hall_exterior: "",
    hall_interior: "",
    hall_seatinformation: "",
    hall_exception: "",
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
        const data = "d:/Web_dev/nextjsweb/public/uploads/"+ delThumb;
        console.log("deleting file", data);
        
        Axios.post("/api/deletefile", {data}).then((res)=>{
        if(res.status == 200){
        //       //login 성공
            console.log("파일삭제 결과", res.data.users);
        }
        });    
        ////////

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
                    <p className={sty.filefont}>드래그 또는 클릭으로 자료를 첨부해주세요.</p>         
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


/////=========== TheaterInfoWrite 페이지 메인 =====================================
export const TheaterInfoWrite = ()=> {
    let boxprops ={ width:400, height:150};
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue } = methods;

    const onSubmit = (data: IFormInput) => {
        Axios.post("/api/getTheaterInfo", {data}).then((res)=>{
            if(res.status == 200){
                //login 성공
                console.log(res.data.users);
                Router.push("/TheaterInfoPanel")
            }
        });
    }

    return(
        <>
        <Header />
        <Leftside />
        <div className={sty.fullbox}>
            
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
                <div className={sty.top_title}>공연장정보</div>
                <div className={sty.top_subtitle}>공연장정보 작성</div>
                <div
                    style={{
                        width: "840px",
                        textAlign: "center",
                        borderBottom: "2px solid #aaa",
                        lineHeight: "0.2em",
                        margin: "40px 30px 20px",
                    }}></div>
            </div>
            <div className={sty.layout_body} >
                <div className={sty.body_row1}>
                    <div className={sty.body_title}>공연장소</div>
                    <div className={sty.body_title}>공연장 객석 수</div>
                    <div className={sty.body_title}>공연장 크기</div>
                    <div className={sty.body_title}>공연도면</div> 
                    <div className={sty.body_title}>공연장 외관</div>
                    <div className={sty.body_title}>공연장 내부</div>
                    <div className={sty.body_title}>무대공간</div>
                    <div className={sty.body_title}>객석</div>
                    <div className={sty.body_title}>특이사항</div>         
                </div>
                <div className={sty.body_row2}> 
                    <div className={sty.body_box} style={{width:"500px"}}><FormInputText name="hall_place" control={control} label="공연장소를 입력하세요."/></div>
                    <div className={sty.body_box} style={{width:"220px"}} ><FormInputText name="hall_seatnumber" control={control} label="객석수를 입력하세요."/>
                        <div className={sty.body_unit} style={{margin:"-40px 230px 0px"}}>석</div>
                    </div>                    
                    <div className={sty.body_box} style={{width:"220px"}} ><FormInputText name="hall_size" control={control} label="공연장 크기를 입력하세요."/>
                        <div className={sty.body_unit} style={{margin: "-40px 230px 0px"}}>㎥</div>
                    </div>                    
                    <div className={sty.body_box} style={{margin: "80px 120px 0px"}}><ImgUpload /></div>
                    <div className={sty.body_box} style={{margin: "70px 120px 0px"}}><ImgUpload /></div>
                    <div className={sty.body_box} style={{margin: "70px 120px 0px"}}><ImgUpload /></div>
                    <div className={sty.body_box} style={{margin: "70px 120px 0px"}}><ImgUpload /></div>
                    <div className={sty.body_box} style={{margin: "70px 120px 0px"}}><ImgUpload /></div>
                    <div className={sty.body_box} style={{width:"1000px", margin: "60px 135px 0px"}} ><FormInputMultilineText name="hall_exception" control={control} label="기타 특이사항을 작성하세요."/></div>
                </div>    
            </div>
            
            <div className={sty.layout_bottom}>                 
                <Button className={sty.finishbutton} onClick={() => reset()} color="inherit" variant="contained">  취소 </Button>                                         
                <Button className={sty.finishbutton} style={{margin:"0px 20px 0px"}} color="primary"  onClick={handleSubmit(onSubmit)} variant="contained">  저장하기 </Button> 
            </div>
        </div>
    </div>
    </>                
    );
}


export default TheaterInfoWrite;