import styles from './Leftside.module.css';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Leftside() {
    return (
        <>
        <div className={styles.leftsidebox}>       
            <div className={styles.contentscontainer}>
                <div className={styles.gongtong} style={{cursor:'pointer'}}>공통 메뉴</div>
                
                <div className={styles.notice} style={{cursor:'pointer'}}>공지사항</div>
                {/* <Link href='/Footer'> */}
                    <div className={styles.schedule} style={{cursor:'pointer'}}>일정</div> 
                {/* </Link>             */}
                <div className={styles.library} style={{cursor:'pointer'}}>자료실</div>
                <div className={styles.star} style={{cursor:'pointer'}}>즐겨찾기 자료</div>    
            </div>
            
            <div className={styles.process} style={{cursor:'pointer'}}>Process 메뉴</div> 

            <div className={styles.processcontainer}>
                <Box className={styles.nowbox}/>  

                <div className={styles.textsbox}>
                    <div className={styles.about} style={{cursor:'pointer'}}>About</div>
                    <div className={styles.ginfo} style={{cursor:'pointer'}}>공연기획정보</div>
                    <div className={styles.janginfo} style={{cursor:'pointer'}}>공연장정보</div>  

                    <div className={styles.pre} style={{cursor:'pointer'}}>Pre-Production</div>
                    <div className={styles.heemang} style={{cursor:'pointer'}}>희망연출정보</div>
                    <div className={styles.gisul} style={{cursor:'pointer'}}>기술구체화협의</div> 

                    <div className={styles.pro} style={{cursor:'pointer'}}>Production</div>
                    <div className={styles.gonginfo} style={{cursor:'pointer'}}>제작공간</div>

                    <div className={styles.post} style={{cursor:'pointer'}}>Post-Production</div>
                    <div className={styles.chulgu} style={{cursor:'pointer'}}>철거 및 반출 협의</div>
                    <div className={styles.hyebup} style={{cursor:'pointer'}}>협업 평가</div>                    
                </div>                
            </div>
        </div>

        <div className={styles.numbersbox}><img src="/images/numbers.svg" alt="numbers"/></div>

        </>
    );
}