import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside2';
import sty from '../src/css/HopeInfoWrite.module.css'
import BasicTextFields from '../src/component/basictext';
import ReadOnlyTextFields from '../src/component/readonlytext';
import MultilineTextFields from '../src/component/multitext'
import Link from 'next/link'
import Button from '@mui/material/Button';
import FormDialog2 from '../src/component/fileattachdialogbtn';

export default function HopeInfoWirte(){
    let boxprops ={ width:400, height:150};
    
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
                <div className={sty.layout_top_txt1}>희망연출정보</div>
                <div className={sty.layout_top_txt2}>희망연출내용 작성</div>
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
                    <div className={sty.body_row_subitem1}>희망연출명</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"공연명을 입력하세요"}/></div>
                </div>
                <div className={sty.body_row2}>
                    <div className={sty.body_row_subitem1}>대표이미지</div>
                    <div className={sty.body_row_subitem2}><ReadOnlyTextFields labeltext={"샤이니.jpg"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>                    
                </div>
                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}>세부내용</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"공연명을 입력하세요"}/></div>
                </div>
                <div className={sty.body_row4}>
                    <div className={sty.body_row_subitem1}>의도 및 기대효과</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><MultilineTextFields labeltext={"공연구성 및 내용을 작성하세요"}/></div>
                </div>
                <div className={sty.body_row5}>
                    <div className={sty.body_row_subitem1}>특이사항 및 추가참고 사항</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><MultilineTextFields labeltext={"기타 특이사항을 작성하세요"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>  
                </div>

                <div className={sty.layout_top_txt1}>희망연출 목표</div>
                <div
                style={{
                    width: "840px",
                    textAlign: "center",
                    borderBottom: "2px solid #aaa",
                    lineHeight: "0.2em",
                    margin: "40px 0 20px",
                }}></div>

                <div className={sty.body_row6}>
                    <div className={sty.body_row_subitem1}>희망 연출 시간</div>
                    <div></div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"공연시간을 입력하세요"}/></div>                    
                    <div>분</div>

                </div>
                <div className={sty.body_row7}>
                    <div className={sty.body_row_subitem1}>예산규모</div>
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"총 예산규모를 입력하세요"}/></div>
                    <div>천원</div>
                </div>

                <div className={sty.layout_top_txt2}>희망연출 기술</div>
                <div
                style={{
                    width: "840px",
                    textAlign: "center",
                    borderBottom: "2px solid #aaa",
                    lineHeight: "0.2em",
                    margin: "40px 0 20px",
                }}></div>

                <div className={sty.body_row8}>
                    <div className={sty.body_row_subitem1}>기술분류</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"공연명을 입력하세요"}/></div>
                </div>
                <div className={sty.body_row9}>
                    <div className={sty.body_row_subitem1}>희망이유</div>                     
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"공연명을 입력하세요"}/></div>
                </div>
                <div className={sty.body_row10}>
                    <div className={sty.body_row_subitem1}>특이사항 및 추가참고 사항</div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><MultilineTextFields labeltext={"기타 특이사항을 작성하세요"}/></div>
                    <div style={{margin:"15px 0px 0px"}}> <FormDialog2 /></div>  
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
      </div>
    );
}