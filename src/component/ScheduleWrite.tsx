import React, {useState, useCallback, useMemo, useEffect} from 'react';
import IconButton from './withiconbtn';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useForm } from "react-hook-form";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDropzone } from 'react-dropzone';
import {useStyles} from '../css/NoticeWriteCSS'; //Material UI Style Box
import {Modal, Box} from '@mui/material';
import styles from '../css/Notice.module.css';

import { FormInputText } from "./FormInputText";
import { FormInputDatetimePicker } from './FormInputDatetimePicker';
import {FormInputDropdown} from './FormInputDropdown';
import {FormInputSearch} from './FormInputSearch';

interface IFormInput {
    schedule_title:String;
    schedule_start:String;
    schedule_end:String;
    schedule_participants:String;
    schedule_place:String;
    schedule_taskspace:String;
    }
    
    const defaultValues = {
        schedule_title:"",
        schedule_start:"",
        schedule_end:"",
        schedule_participants:"",
        schedule_place: "",
        schedule_taskspace:"",
    };
    

    
///Dropzone에 사용할 변수
type Information = { src:string; width:number; height:number };

var pics = new Array<Information>(); 
var pic_count:number = 0 ;
var imgUploadFileList:string;
var fileUploadFileList:string;

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 816,
    height: 646,
    bgcolor: 'background.paper',
    border: '1px solid #E0E0E0',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  

/////=========== TheaterInfoWrite 페이지 메인 =====================================
export const TechCommentWrite = (props)=> {
    let boxprops ={ width:400, height:150};
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue } = methods;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const [taskList, setTaskList] = React.useState(['기획정보','희망연출','기술구체화', '기술협의']);
    const [scheduleTaskspace, setScheduleTaskspace] = React.useState("");
    const [schduleTilte, setScheduleTitle] = React.useState("");
    const [schduleStart, setScheduleStart] = React.useState(new Date());
    const [schduleEnd, setScheduleEnd] = React.useState(new Date());
    const [schdulePlace, setSchedulePlace] = React.useState("");
    const [schduleParticipants, setScheduleParticipants] = React.useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.onClose(false); //Parent에 값 전달
    }

    const handleGetData= (data)=>{
        console.log('dropdown',data)
        setScheduleTaskspace(data);
    }
  
    const onSubmit = (data: IFormInput) => {
        
        /////----  Cookie로 부터 user 정보 가져오기 
        // const user = Axios.get('/api/getUserCookieInfo').then((res)=> {
        //     // console.log('l',res.data.user);
        //     if (res.status == 200) {
        //       if (res.data.statusCode == 1) { //쿠키 있을때 처리 루프
        //         let today = String(new Date());
        //         let sendData:IFormInput = {name:res.data.user.username, team:res.data.user.team, title:data.title, content:data.content, image:imgUploadFileList, file:fileUploadFileList, lasttime:today};
        //         props.parentFunc(sendData);
        //       } else {  //쿠키 없을떄 처리 루프
        //       let today = String(new Date());
        //       let sendData:IFormInput = {name:res.data.user.username, team:res.data.user.team, title:data.title, content:data.content, image:imgUploadFileList, file:fileUploadFileList, lasttime:today};
        //       props.parentFunc(sendData);
        //       console.log("ParentFunc Called")
        //       } 

        //     } else {
        //         // res.status Error 처리
        //     }
       
        //   }); 
        /////---- 
         setScheduleTitle(data.schedule_title);
         setScheduleStart(data.schedule_start);
         setScheduleEnd(data.schedule_end);
         setSchedulePlace(data.schedule_place);
         setScheduleParticipants(data.schedule_participants);

        data.schedule_taskspace = scheduleTaskspace;
        console.log('onsumit',data);

        props.parentFunc(data);
        setOpen(false);
        props.onClose(false); //Parent에 값 전달
        
                            
    }

    const handleCancelBtn = () => {
        handleClose(false);
    }

    useEffect(()=>{
        setOpen(props.open);
    },[props.open]);

    return(

    <Modal
        open={open}
        onClose={handleClose}
      >
          <Box sx={style}>
            <Button className={styles.addclosebutton} variant="text" onClick={handleClose}>X</Button>
            <div className={classes.ContainerMain}>
                <div className={classes.ContainerSub1}>
                    <div className={classes.Label1}>일정 등록</div>
                    <div><span className={classes.Label2}>일정을 등록해 주세요: </span><span className={classes.Label3}><span style={{color:'red'}}>*</span>는 필수사항입니다.</span></div>
                </div>
                <div
                    style={{
                        width: "816px",
                        textAlign: "center",
                        borderBottom: "2px solid #aaa",
                        lineHeight: "0.2em",
                        margin: "10px 0 0px",
                    }}></div>
                <div className={classes.ContainerSub2}>
                    <div className={classes.Title}><div>일정제목<span style={{color:'red'}}>*</span></div> <div style={{marginLeft:'130px', width:"620px"}} ><FormInputText name="schedule_title" control={control} label="제목을 입력해 주세요"/></div></div>
                    <div className={classes.Content}><div>소속협업공간<span style={{color:'red'}}>*</span></div> <div style={{marginLeft:'120px', width:"620px"}} ></div> <FormInputDropdown MenuList={taskList} name="schedule_participants" control={control} label="제목을 입력해 주세요"/></div>
                    <div className={classes.ImgUpload}><div>날짜선택</div><div style={{marginLeft:'50px', width:"500px"}} >  </div> <FormInputDatetimePicker name="schedule_start" control={control} label="제목을 입력해 주세요"/> <FormInputDatetimePicker name="schedule_end" control={control} label="제목을 입력해 주세요"/></div>
                    <div className={classes.ImgUpload}><div>참여자</div><div style={{marginLeft:'50px', width:"500px"}} >  </div><FormInputSearch getdata={handleGetData}/></div>
                    <div className={classes.ImgUpload}><div>장소</div><div style={{marginLeft:'130px', width:"620px"}} ><FormInputText name="schedule_place" control={control} label="제목을 입력해 주세요"/></div> </div>
                </div>
                <div className={classes.ContainerSub3}>
                    <div> <Button className={classes.Button1} onClick={handleSubmit(onSubmit)} variant="contained"> 등록완료 </Button> </div>
                    <div> <Button className={classes.Button2} onClick={handleCancelBtn} variant="contained"> 취소 </Button> </div>
                </div>
            </div>
            </Box>
        </Modal>

    );
}


export default TechCommentWrite;