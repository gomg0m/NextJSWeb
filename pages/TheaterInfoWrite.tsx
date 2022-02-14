import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside1(1)';
import sty from '../src/css/PerformInfoWirte.module.css'
import ReadOnlyTextFields from '../src/component/readonlytext';
import IconButton from '../src/component/withiconbtn';
import Link from 'next/link';
import Button from '@mui/material/Button';
import FormDialog2 from '../src/component/fileattachdialogbtn';
import { height } from '@mui/system';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { FormInputText } from "../src/component/FormInputText";
import { FormInputMultilineText } from '../src/component/FormInputMultilineText'
import Router from 'next/router';


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
                <div className={sty.layout_top_txt1}>공연장정보</div>
                <div className={sty.layout_top_txt2}>공연장정보 작성</div>
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
                        <div className={sty.body_row_subitem1}>공연장소</div>
                        <div className={sty.body_row_subitem2} style={{width:"300px", margin:"-15px 30px 0px"}} ><FormInputText name="hall_place" control={control} label="공연장소를 검색하세요"/></div>
                </div>
                <div className={sty.body_row2}>
                    <div className={sty.body_row_subitem1}>공연장 객석 수</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="hall_seatnumber" control={control} label="객석수를 입력하세요"/></div>                    
                    <div>석</div>
                </div>
                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}>공연장 크기</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="hall_size" control={control} label="공영장 크기를 입력하세요"/></div>                    
                    <div>㎥</div>
                </div>

                <div className={sty.body_row4}>
                    <div className={sty.body_row_subitem1}>공연도면</div>
                    <div className={sty.body_row_subitem2}><ReadOnlyTextFields labeltext={"샤이니.jpg"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>                    
                    <div style={{display:"flex", width:"800px", justifyContent:"flex-start"}}>
                        <div style={{margin:"0px 0px 0px"}}><IconButton labeltext={"샤이니스타디움도면.pdf"} /></div>
                        <div style={{margin:"0px 10px 0px"}}><IconButton labeltext={"스타디움_측면.dwg"} /></div>
                    </div>
                </div>

                <div className={sty.body_row5}>
                    <div className={sty.body_row_subitem1}>공연장 외관</div>
                    <div className={sty.body_row_subitem2}><ReadOnlyTextFields labeltext={"공연장.jpg"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>                    
                    <div style={{display:"flex", width:"800px", justifyContent:"flex-start"}}>
                        <div style={{margin:"0px 0px 0px"}}><IconButton labeltext={"공연장외관사진.jpg"} /></div>
                        <div style={{margin:"0px 10px 0px"}}><IconButton labeltext={"공연장외관자료.pdf"} /></div>
                    </div>
                </div>

                <div className={sty.body_row6}>
                    <div className={sty.body_row_subitem1}>공연장 내부</div>
                    <div className={sty.body_row_subitem2}><ReadOnlyTextFields labeltext={"공연장_내부.jpg"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>                    
                    <div style={{display:"flex", width:"800px", justifyContent:"flex-start"}}>
                        <div style={{margin:"0px 0px 0px"}}><IconButton labeltext={"공연장내부사진.jpg"} /></div>
                    </div>
                </div>

                <div className={sty.body_row7}>
                    <div className={sty.body_row_subitem1}>무대공간</div>
                    <div className={sty.body_row_subitem2}><ReadOnlyTextFields labeltext={"무대공간.jpg"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>                    
                    <div style={{display:"flex", width:"800px", justifyContent:"flex-start"}}>
                        <div style={{margin:"0px 0px 0px"}}><IconButton labeltext={"공연장_무대공간.jpg"} /></div>
                        <div style={{margin:"0px 10px 0px"}}><IconButton labeltext={"BackStage.pdf"} /></div>
                    </div>
                </div>

                <div className={sty.body_row8}>
                    <div className={sty.body_row_subitem1}>객석</div>
                    <div className={sty.body_row_subitem2}><ReadOnlyTextFields labeltext={"객석.jpg"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>                    
                    <div style={{display:"flex", width:"800px", justifyContent:"flex-start"}}>
                        <div style={{margin:"0px 0px 0px"}}><IconButton labeltext={"객석사진1.jpg"} /></div>
                        <div style={{margin:"0px 10px 0px"}}><IconButton labeltext={"객석사진2.jpg"} /></div>
                    </div>
                </div>


                <div className={sty.body_row8}>
                    <div className={sty.body_row_subitem1}>특이사항</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><FormInputMultilineText name="hall_exception" control={control} label="기타 특이사항을 작성하세요"/></div>
                </div>
            </div>
            <div className={sty.layout_bottom}>                 
                <Button className={sty.notosanskr_bold_black_24px} style={{margin:"0px 20px 0px"}} onClick={() => reset()} variant="contained">  취소 </Button>                                         
                <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}} onClick={handleSubmit(onSubmit)} variant="contained">  저장하기 </Button> 
            </div>
        </div>
    </div>
    </>                
    );
}


export default TheaterInfoWrite;