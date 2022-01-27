import React from 'react';
import sty from './planInfoWirte.module.css'
import ComboBox from './combobox';
import BasicTextFields from './basictext';
import ReadOnlyTextFields from './readonlytext';
import MultilineTextFields from './multitext'
import DateTimePicker  from './datetimepicker';
import AttachFileIconBtn from './attachfilebtn';
import IconButton from './withiconbtn';
import SearchTextFields from './searchicontext';
import Box from './box';
import Link from 'next/link'
import Button from '@mui/material/Button';
import FormDialog2 from './fileattachdialogbtn';


export default function planInfoWirte(){
    let boxprops ={ width:400, height:150};
    
    return(
        <div className={sty.infoframe}>
            <div className={sty.layout_box}><Box boxprops={boxprops}/></div>
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
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><ComboBox /></div>
                </div>
                <div className={sty.body_row2}>
                    <div className={sty.body_row_subitem1}>공연명</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"공연명을 입력하세요"}/></div>
                </div>
                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}>공연예상일자</div>
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><DateTimePicker labeltext={"시작일자"}/></div>
                    <div style={{margin:"15px 0px 0px"}}>-</div>
                    <div style={{margin:"0px 40px 0px"}} ><DateTimePicker labeltext={"종료일자"}/></div>
                </div>
                <div className={sty.body_row4}>
                    <div className={sty.body_row_subitem1}>공연이미지</div>
                    <div className={sty.body_row_subitem2}><ReadOnlyTextFields labeltext={"샤이니.jpg"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>                    
                </div>
                <div className={sty.body_row5}>
                    <div className={sty.body_row_subitem1}>협업팀 초대</div>
                    <div className={sty.body_row_subitem2} style={{width:"300px", margin:"-15px 30px 0px"}} ><SearchTextFields labeltext={"협업팀 입력"}/></div>
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
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"공연시간을 입력하세요"}/></div>                    
                    <div>분</div>

                </div>
                <div className={sty.body_row7}>
                    <div className={sty.body_row_subitem1}>공연횟수</div>
                    <div></div>                   
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"공연횟수를 입력하세요"}/></div>
                    <div>회</div>
                </div>
                <div className={sty.body_row8}>
                    <div className={sty.body_row_subitem1}>총 예산규모</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"총 예산규모를 입력하세요"}/></div>
                    <div>천원</div>
                </div>
                <div className={sty.body_row9}>
                    <div className={sty.body_row_subitem1}>목표관객 수</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"목표 관객수를 입력하세요"}/></div>
                    <div>명</div>
                </div>
                <div className={sty.body_row10}>
                    <div className={sty.body_row_subitem1}>목표티켓가격</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"목표하는 티켓가격을 입력하세요"}/></div>
                    <div>원</div>
                </div>
                <div className={sty.body_row11}>
                    <div className={sty.body_row_subitem1}>공연구성 및 내용</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><MultilineTextFields labeltext={"공연구성 및 내용을 작성하세요"}/></div>
                </div>
                <div className={sty.body_row12}>
                    <div className={sty.body_row_subitem1}>특이사항</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><MultilineTextFields labeltext={"기타 특이사항을 작성하세요"}/></div>
                </div>
                <div className={sty.body_row13}>
                    <div className={sty.body_row_subitem1}>자료</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><MultilineTextFields labeltext={"기타 자료관련 내용을 작성하세요"}/></div>
                </div>
            </div>
            <div className={sty.layout_bottom}>
                <Link href="/card">    
                    {/*<button className={sty.notosanskr_bold_black_24px}>취소</button>*/}
                    <Button className={sty.notosanskr_bold_black_24px} style={{margin:"0px 20px 0px"}} variant="contained">  취소 </Button>
                </Link>                
                <Link href="/About">    
                    {/*</Link>/<button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}}>저장하기</button>*/}
                    <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}} variant="contained">  저장하기 </Button>
                </Link>    
            </div>
        </div>

    );
}