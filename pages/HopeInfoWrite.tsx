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
import Router from 'next/router';

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
    hope_addtime: ""
    };

    export const HopeInfoWirte = () => {
    let boxprops ={ width:400, height:150};
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue } = methods;
    const onSubmit = (data: IFormInput) => {
        Axios.post("/api/getHopeInfo", {data}).then((res)=>{
            if(res.status == 200){
                //login 성공
                console.log(res.data.users);
                Router.push("/HopeInfoPanel")
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
                <div className={sty.layout_top_txt1}>희망연출정보</div>
                <div className={sty.layout_top_txt2}>희망연출내용 작성</div>
                <div
                style={{
                    width: "1400px",
                    textAlign: "center",
                    borderBottom: "2px solid #aaa",
                    lineHeight: "0.2em",
                    margin: "40px 30px 20px",
                }}></div>
            </div>

            <div className={sty.layout_body}>
                <div className={sty.body_row1}>
                    <div className={sty.body_row_subitem1}>희망연출명</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 30px 0px"}} ><FormInputText name="hope_name" control={control} label="희망연출을 입력하세요"/></div>
                </div>
                <div className={sty.body_row2}>
                    <div className={sty.body_row_subitem1}>대표이미지</div>
                    <div className={sty.body_row_subitem2}><ReadOnlyTextFields labeltext={"샤이니.jpg"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>                    
                </div>
                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}>세부내용</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 30px 0px"}} ><FormInputText name="hope_content" control={control} label="세부 내용을 입력하세요"/></div>
                </div>
                <div className={sty.body_row4}>
                    <div className={sty.body_row_subitem1}>의도 및 기대효과</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"0px 30px 0px"}} ><FormInputText name="hope_intention" control={control} label="의도 및 기대효과를 입력하세요"/></div>
                </div>
                <div className={sty.body_row5}>
                    <div className={sty.body_row_subitem1}>특이사항 및 추가참고 사항</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"0px 30px 0px"}} ><FormInputText name="hope_exception" control={control} label="특이사항 및 추가 참고사항을 입력하세요"/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>  
                </div>

                <div className={sty.layout_top_txt1} style ={{margin:"100px -50px 0px"}}>희망연출 목표</div>
                <div
                style={{
                    width: "1400px",
                    textAlign: "center",
                    borderBottom: "2px solid #aaa",
                    lineHeight: "0.2em",
                    margin: "40px -70px 20px",
                }}></div>

                <div className={sty.body_row6}>
                    <div className={sty.body_row_subitem1}>희망 연출 시간</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 30px 0px"}} ><FormInputText name="hope_time" control={control} label="희망 연출 시간을 입력하세요"/></div>                    
                    <div style ={{margin:"10px 0px 0px"}}>분</div>
                </div>

                <div className={sty.body_row7}>
                    <div className={sty.body_row_subitem1}>예산규모</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 30px 0px"}} ><FormInputText name="hope_budget" control={control} label="예산 규모를 입력하세요"/></div>
                    <div >천원</div>
                </div>

                <div className={sty.layout_top_txt1} style ={{margin:"100px -50px 0px"}}>희망연출 기술</div>
                <div
                style={{
                    width: "1400px",
                    textAlign: "center",
                    borderBottom: "2px solid #aaa",
                    lineHeight: "0.2em",
                    margin: "40px -70px 20px",
                }}></div>

                <div className={sty.body_row8}>
                    <div className={sty.body_row_subitem1}>기술분류</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 30px 0px"}} ><FormInputText name="hope_tech" control={control} label="희망 연출 기술을 입력하세요"/></div>
                </div>
                <div className={sty.body_row9}>
                    <div className={sty.body_row_subitem1}>희망이유</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"0px 30px 0px"}} ><FormInputText name="hope_reason" control={control} label="희망 이유를 입력하세요"/></div>
                </div>
                <div className={sty.body_row10}>
                    <div className={sty.body_row_subitem1}>특이사항 및 추가참고 사항</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"0px 30px 0px"}} ><FormInputText name="hope_reference" control={control} label="특이사항 및 추가 참고사항을 입력하세요"/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>  
                </div>
            </div>

            <div className={sty.layout_bottom}>  
                    <Button className={sty.notosanskr_bold_black_24px} style={{margin:"0px 20px 0px"}} onClick={() => reset()} variant={"contained"}>  취소 </Button>           
                    <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}} onClick={handleSubmit(onSubmit)} variant={"contained"}>  저장하기 </Button>  
            </div>
            
        </div>
      </div>
    );
}
export default HopeInfoWirte;