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
  
    //--- ????????? thumbnail??? Delete Icon Button??? ????????? ?????????
    const deleteHandler =(index) =>{
        console.log("deleting index", index);
        //????????? ????????? ?????? ??????.
        let delThumb = thumb[index];

        //????????? ??????????????? ???????????? ?????? ????????? ????????? ????????????
        // newThemb????????? ????????? ?????????.
        let newThumb = [...thumb];

        //newThumb???????????? ?????? ?????? ?????? ??? 
        //????????? ???????????? ??????????????? ?????????
        newThumb.splice(index, 1);

        //????????? ????????? ?????? ????????? newThumb??????
        //setThumb ?????????.
        setThumb(newThumb);
        
        ////?????? ????????? ????????? ???????????? Sever?????? ?????? ?????? API??? ????????????.
        const data = "d:/Web_dev/nextjsweb/public/uploads/"+ delThumb;
        console.log("deleting file", data);
        
        Axios.post("/api/deletefile", {data}).then((res)=>{
        if(res.status == 200){
        //       //login ??????
            console.log("???????????? ??????", res.data.users);
        }
        });    

    }; //End Of deleteHandler
  
    //--- Dropzone Area Drop?????? ????????? ?????????
    const onDrop = useCallback(
        acceptedFiles => {
            const formData = new FormData();
            const config = { headers: { "content-type": "multipart/form-data" } }

            acceptedFiles.forEach((file) => {        
                formData.append("file", file);
                console.log("acceptFilesNum",acceptedFiles);
            })

            {///let??? Block ???????????? ???????????? ????????? newThumb??? ??????????????? ????????? ??? ??????????????? ???????????? ???.
                let newThumb = [...thumb]; 
                Axios.post<any>("/api/imgupload", formData, config).then((res) => {                 
                    setThumb([...thumb, ...res.data]);  
                    newThumb =[...thumb, ...res.data];
                    console.log("new thumb list", newThumb);
                    imgUploadFileList=JSON.stringify(newThumb);
                    console.log("imgUplist", imgUploadFileList);
                    // /////MySQL??? Upload??? ????????? ???????????? ?????? ????????? ??????    
                    // Axios.post("/api/jsonaccess", {newThumb}).then((res)=>{
                    //     if(res.status == 200){
                    //         //login ??????
                    //         console.log("Upload DB?????? ??????", res.data.user);
                    //     }
                    // });
                    // /////
                });    
            }
        }, [thumb]
    )
   
    //--- Dropzon Area ?????? ??? ?????? ?????? 
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
                <p>????????? ??????!</p> :
                <p>?????? ????????? ?????? ??????</p>         
            }      
            </div>
        </div>
        <div style={{margin:"0px 15px 0px", display:"flex"}}>
            {thumb &&
                thumb.map((item: string, index: number) => {
                return (              
                    <div>                  
                    <img src={`/uploads/${item}`} height="50" alt="??????????????????"></img>
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



/////=========== PlanInfoWrite ????????? ?????? =====================================
export const planInfoWirteWrite = ()=> {
    let boxprops ={ width:400, height:150};
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue } = methods;

    const onSubmit = (data: IFormInput) => {
        data.plan_id = "9262333";
        data.plan_image=imgUploadFileList; //Dropzone?????? ????????? image file list??? data??? ?????????.
        console.log("Form data", data);
        Axios.post("/api/insertPlanInfo", {data}).then((res)=>{
            if(res.status == 200){
                //login ??????
                console.log(res.data.users);
                Axios.get("/api/InsertPlanInfo").then((res)=>{
                    if(res.status == 200){
                        //login ??????
                        console.log("last plan_id", res.data.users);
                        let routname = '/PlanInfoPanel/'+String(res.data.users[0].plan_id);
                        Router.push(routname);
                        console.log("routing plan_id", routname);
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
                    borderBottom: "4px solid #EABB41",
                    lineHeight: "0.2em",
                    margin: "0px 0 20px",                    
                }}></div>
            <div className={sty.layout_top}>
                <div className={sty.layout_top_txt1}>??????????????????</div>
                <div className={sty.layout_top_txt2}>?????????????????? ??????</div>
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
                    <div className={sty.body_row_subitem1}>??????</div>
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><FormInputDropdown name="plan_genre" control={control} label="Text Input"/></div>
                </div>
                <div className={sty.body_row2}>
                    <div className={sty.body_row_subitem1}>?????????</div>                     

                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="plan_name" control={control} label="???????????? ???????????????" /></div>
                </div>

                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}>??????????????????</div>
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><FormInputDatetimePicker name="plan_start" control={control} label="????????????"/></div>
                    <div style={{margin:"15px 0px 0px"}}>-</div>
                    <div style={{margin:"0px 40px 0px"}} ><FormInputDatetimePicker name="plan_end" control={control} label="????????????"/></div>
                </div>

                <div className={sty.body_row4}>
                    <div className={sty.body_row_subitem1}>???????????????</div>
                    <div style={{margin:"15px 0px 0px"}}> <ImgUpload /></div>                
                </div>
                <div className={sty.body_row5}>
                    <div className={sty.body_row_subitem1}>????????? ??????</div>
                    <div className={sty.body_row_subitem2} style={{width:"300px", margin:"-15px 30px 0px"}} ><FormInputText name="member" control={control} label="????????? ??????"/></div>
                    <div style={{display:"flex", width:"800px", justifyContent:"flex-start"}}>
                    </div>
                </div>
                <div className={sty.body_row6}>
                    <div className={sty.body_row_subitem1}>????????????</div>
                    <div></div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="plan_time" control={control}label="??????????????? ???????????????"/></div>                    
                    <div>???</div>

                </div>
                <div className={sty.body_row7}>
                    <div className={sty.body_row_subitem1}>????????????</div>
                    <div></div>                   
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="plan_number" control={control} label="??????????????? ???????????????"/></div>
                    <div>???</div>
                </div>
                <div className={sty.body_row8}>
                    <div className={sty.body_row_subitem1}>??? ????????????</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="plan_budget" control={control} label="??? ??????????????? ???????????????"/></div>
                    <div>??????</div>
                </div>
                <div className={sty.body_row9}>
                    <div className={sty.body_row_subitem1}>???????????? ???</div>

                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="goal_people" control={control} label="?????? ???????????? ???????????????"/></div>
                    <div>???</div>
                </div>
                <div className={sty.body_row10}>
                    <div className={sty.body_row_subitem1}>??????????????????</div>

                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="goal_price" control={control} label="???????????? ??????????????? ???????????????"/></div>
                    <div>???</div>
                </div>
                <div className={sty.body_row11}>
                    <div className={sty.body_row_subitem1}>???????????? ??? ??????</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><FormInputMultilineText name="plan_contents" control={control} label="???????????? ??? ????????? ???????????????"/></div>
                </div>
                <div className={sty.body_row12}>
                    <div className={sty.body_row_subitem1}>????????????</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><FormInputMultilineText name="plan_exception" control={control} label="?????? ??????????????? ???????????????"/></div>
                </div>
                <div className={sty.body_row13}>
                    <div className={sty.body_row_subitem1}>??????</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><FormInputMultilineText name="plan_file" control={control} label="?????? ???????????? ????????? ???????????????"/></div>
                </div>
            </div>
            <div className={sty.layout_bottom}>
                <Button className={sty.notosanskr_bold_black_24px} style={{margin:"0px 20px 0px"}} onClick={() => reset()} variant={"contained"} >  ?????? </Button>
                <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}} onClick={handleSubmit(onSubmit)} variant={"contained"}>  ???????????? </Button>
            </div>
        </div>
      </div>
    );
}

export default planInfoWirteWrite;