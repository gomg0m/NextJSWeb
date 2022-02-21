import React, {useState, useCallback, useMemo, useEffect} from 'react';
import sty from '../css/PerformInfoWirte.module.css'
import IconButton from '../component/withiconbtn';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { FormInputText } from "./FormInputText";
import { FormInputMultilineText } from './FormInputMultilineText'
import Router from 'next/router';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDropzone } from 'react-dropzone';
import {useStyles} from '../../src/css/TechCommentWriteStyles'; //Material UI Style Box

interface IFormInput {
    name:String;
    team:String;
    comment:String;
    image:String;
    lasttime:String;
    }
    
    const defaultValues = {
        name:"",
        team:"",
        comment:"",
        image: "",
        lasttime: "",
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


/////=========== TheaterInfoWrite 페이지 메인 =====================================
export const TechCommentWrite = (props)=> {
    let boxprops ={ width:400, height:150};
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue } = methods;
    const classes = useStyles();

    const onSubmit = (data: IFormInput) => {
        let sendData:IFormInput = {name:data.name, team:"기술팀", comment:data.comment, image:imgUploadFileList, lasttime:"20220219"};
        props.parentFunc(sendData);
    }

    return(

            <div className={classes.ContainerMain}>
                <div className={classes.ContainerSub1}>
                    <div className={classes.Label1}>의견</div>
                        {/* <div className={classes.Name} > <FormInputText name="name" control={control} label="작성자의 이름을 등록하세요"/></div>
                        <div className={classes.Team} > <FormInputText name="team" control={control} label="소속을 적으세요"/></div> */}
                        <div className={classes.Content} > <FormInputMultilineText name="comment" control={control} label="의견을 남겨 보세요"/></div>
                    </div>
                <div className={classes.ContainerSub2}>
                    <div className={classes.ImgUpload}> <ImgUpload /> </div>
                    <div> <Button className={classes.Button} onClick={handleSubmit(onSubmit)} variant="contained"> 의견쓰기 </Button> </div>
                </div>
            </div>

    );
}


export default TechCommentWrite;