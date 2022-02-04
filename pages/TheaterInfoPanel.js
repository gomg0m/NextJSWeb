import React from 'react';
import Header from '../src/fix/Header';
import sty from '../src/css/TheaterInfoPanel.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TheaterTable from '../src/component/TheaterTable';
import TheaterDrawing from '../src/component/TheatherDrawing';
import TheaterPicture from '../src/component/TheatherPicture';

export default function TheaterInfoPanel(){       
    return(
        <div className={sty.infoframe}>
            <Header />
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
                <div className={sty.layout_top_txt2}>공연장정보</div>
                <div className={sty.layout_top_image}><img src="images/map.png" alt="Map"></img></div>
                <div className={sty.layout_top_table}><TheaterTable /></div>
                <div
                    style={{
                        width: "1496px",
                        textAlign: "center",
                        borderBottom: "2px solid #aaa",
                        lineHeight: "0.2em",
                        margin: "40px 0 20px",
                    }}></div>
            <div className={sty.layout_body}>
                <div>공연장 도면</div>
                <div className={sty.layout_body_drawing}> <TheaterDrawing /> </div>
                <div>공연장 사진</div>
                <div className={sty.layout_body_picture}> <TheaterPicture /> </div>
            </div>
            <div className={sty.layout_bottom}>            
                <Link href="/About">    
                    {/*</Link>/<button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}}>저장하기</button>*/}
                    <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"0px 20px 0px"}} variant="contained">  수정하기 </Button>
                </Link>    
            </div>
        </div>
    </div>                
    );
}