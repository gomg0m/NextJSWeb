import React, {useState, useCallback, useMemo, useEffect, useContext} from 'react';
import IconButton from './withiconbtn';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useForm } from "react-hook-form";

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
    const [open, setOpen] = useState(false);
    
    const [taskList, setTaskList] = useState(['기획정보','희망연출','기술구체화', '기술협의']);
    const [scheduleTaskspace, setScheduleTaskspace] = useState("");
    const [schduleTilte, setScheduleTitle] = useState("");
    const [schduleStart, setScheduleStart] = useState(new Date());
    const [schduleEnd, setScheduleEnd] = useState(new Date());
    const [schdulePlace, setSchedulePlace] = useState("");
    const [schduleParticipants, setScheduleParticipants] = useState("");
    const [users, setUsers]= useState([]);



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

    function getUserName(){
        Axios.get("/api/getuser").then((res)=>{
            if(res.status == 200){
                //login 성공
                
                let dumy=[];
                res.data.users.map((item)=>(
                    dumy.push(item.user_name)
                ));
                setUsers(dumy);
                console.log('getuser', dumy);
            }
        });

    }

    useEffect(()=>{
        setOpen(props.open);
    },[props.open]);

    useEffect(()=>{
        getUserName();
    },[]);

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
                    <div className={classes.ImgUpload}><div>참여자</div><div style={{marginLeft:'50px', width:"500px"}} >  </div><FormInputSearch getdata={handleGetData} options={users}/></div>
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