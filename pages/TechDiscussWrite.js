import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside2(2)';
import sty from '../src/css/TechDiscussWrite.module.css'
import BasicTextFields from '../src/component/basictext';
import MultilineTextFields from '../src/component/multitext'
import Link from 'next/link'
import Button from '@mui/material/Button';
import ComboBox from '../src/component/combobox';

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
                    <div className={sty.body_row_subitem2} style={{width:"700px", margin:"-15px 30px 0px"}} ><BasicTextFields labeltext={"공연명을 입력하세요"}/></div>
                </div>
                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}>검토내용</div>
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><ComboBox /></div>
                    <div className={sty.body_row_subitem2} style={{margin:"0px 40px 0px"}}><ComboBox /></div>                    
                </div>
                <div className={sty.body_row3}>
                    <div className={sty.body_row_subitem1}></div>
                    <div className={sty.body_row_subitem2} style={{width:"1100px", margin:"-25px 30px 0px"}} ><MultilineTextFields labeltext={"기타 특이사항을 작성하세요"}/></div>
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