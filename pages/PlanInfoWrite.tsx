import React from 'react';
import sty from '../src/css/planInfoWirte.module.css'
import ReadOnlyTextFields from '../src/component/readonlytext';
import IconButton from '../src/component/withiconbtn';
import Button from '@mui/material/Button';
import FormDialog2 from '../src/component/fileattachdialogbtn';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { FormInputText } from "../src/component/FormInputText";
import { FormInputDatetimePicker } from "../src/component/FormInputDatetimePicker";
import {FormInputMultilineText} from '../src/component/FormInputMultilineText'
import {FormInputDropdown} from '../src/component/FormInputDropdown'
import Router from 'next/router';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside1';


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

export const planInfoWirte = ()=> {
    let boxprops ={ width:400, height:150};
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue } = methods;
    const onSubmit = (data: IFormInput) => {
        Axios.post("/api/getPlanInfo", {data}).then((res)=>{
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
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><FormInputDropdown name="plan_genre" control={control} label="장르를 선택하세요"/></div>
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
                    <div className={sty.body_row_subitem2}><ReadOnlyTextFields labeltext={"샤이니.jpg"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>                    
                </div>
                <div className={sty.body_row5}>
                    <div className={sty.body_row_subitem1}>협업팀 초대</div>
                    <div className={sty.body_row_subitem2} style={{width:"300px", margin:"-15px 30px 0px"}} ><FormInputText name="member" control={control} label="협업팀을 검색하세요"/></div>
                    <div style={{display:"flex", width:"800px", justifyContent:"flex-start"}}>
                        <div style={{margin:"0px 0px 0px"}}><IconButton labeltext={"홍길동"} /></div>
                        <div style={{margin:"0px 10px 0px"}}><IconButton labeltext={"BTS"} /></div>
                        <div style={{margin:"0px 0px 0px"}}><IconButton labeltext={"BlackPink"} /></div>
                        <div style={{margin:"0px 10px 0px"}}><IconButton labeltext={"사이"} /></div>
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