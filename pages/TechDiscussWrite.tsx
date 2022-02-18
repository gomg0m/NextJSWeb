import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside2(2)';
import sty from '../src/css/TechDiscussWrite.module.css'
import BasicTextFields from '../src/component/basictext';
import MultilineTextFields from '../src/component/multitext'
import Link from 'next/link'
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { FormInputText } from "../src/component/FormInputText";
import { FormInputDatetimePicker } from "../src/component/FormInputDatetimePicker";
import {FormInputMultilineText} from '../src/component/FormInputMultilineText'
import {FormInputDropdown} from '../src/component/FormInputDropdown';
import Router from 'next/router';


interface IFormInput {
    tech_id: string;
    tech_hope: string;
    tech_name: string;
    tech_image: string;
    tech_1stsubject: string;
    tech_2ndsubject: string;
    tech_contents: string;
    }
    
    const defaultValues = {
    tech_id: "",
    tech_hope: "",
    tech_name:"",
    tech_image:"",
    tech_1stsubject: "",
    tech_2ndsubject: "",
    tech_contents: "",
    };

export default function HopeInfoWirte(){
    let boxprops ={ width:400, height:150};

    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue } = methods;
    const onSubmit = (data: IFormInput) => {
        Axios.post("/api/getTechInfo", {data}).then((res)=>{
            if(res.status == 200){
                //login 성공
                console.log(res.data.users);
                Router.push("/TechDisucssPanel")
            }
        });
    }

    const options1 = [ "사전확인", "사업계획", "고려사항",  "대상물", "연출내용", "구현환경", "반입 및 설치" ];
    const options2 = [ "공연에서 차지하는 비중", "연출 영역(반경)", "동선",  "리프팅 높이", "이동 거리", "속도", "이동 시의 움직임" ];

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
                    margin: "0px 0 20px",                    
                }}></div>

            <div className={sty.layout_top}>
                <div className={sty.layout_top_txt1}>기술구체화협의</div>
                <div className={sty.layout_top_txt2}>다수의 풍선 날리기 기술구체화 협의</div>
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
                    <div className={sty.body_row_subitem1}>기술명</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><FormInputText name="tech_name" control={control} label="기술명을 입력하세요"/></div>
                </div>
                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}>검토내용</div>
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><FormInputDropdown MenuList={options1} name="tech_1stsubject" control={control} label="검토 주제" /></div>
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><FormInputDropdown MenuList={options2} name="tech_2ndsubject" control={control} label="세부 주제" /></div>                    
                </div>
                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}></div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><FormInputMultilineText name="tech_contents" control={control} label="기타 특이사항을 작성하세요"/></div>
                </div>
            </div>
            <div className={sty.button}>
                <Button className={sty.notosanskr_bold_black_24px} style={{margin:"100px 20px 0px"}} onClick={() => reset()} variant={"contained"}>  취소 </Button>
                <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"100px 20px 0px"}} onClick={handleSubmit(onSubmit)} variant={"contained"}>  저장하기 </Button> 
            </div>

        </div>
      </div>
    );
}