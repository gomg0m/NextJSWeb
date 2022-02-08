import React from 'react';
import sty from '../css/HopeInfoPanel.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import HopeTableContent from './HopeTable_content';
import HopeTableObjective from './HopeTable_objective';
import HopeTableTech from './HopeTable_tech';
import HopePicture from './HopePicture';

export default function TheaterInfoPanel(){       
    return(
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
                <div className={sty.layout_top_txt2}>엔딩 장면 다수의 풍선 날리기</div>
                <div><HopePicture /></div>
                <div className={sty.layout_top_table}><HopeTableContent /></div>
            <div>    
                <Link href="/card">    
                    {/*<button className={sty.notosanskr_bold_black_24px}>취소</button>*/}
                    <Button className={sty.notosanskr_bold_black_24px} style={{margin:"0px 20px 0px"}} variant="contained">  취소 </Button>
                </Link>         
                <Link href="/About">    
                    {/*</Link>/<button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}}>저장하기</button>*/}
                    <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}} variant="contained">  수정하기 </Button>
                </Link>    
            </div>
            <div className={sty.layout_body}>
                <div className={sty.layout_top_txt1}>희망연출 목표</div>
                <div className={sty.layout_body_drawing}> <HopeTableObjective /> </div>
                <div className={sty.layout_top_txt2}>희망연출 기술</div>
                <div className={sty.layout_body_drawing}> <HopeTableTech /> </div>
            </div>
        </div>
    </div>                
    );
}