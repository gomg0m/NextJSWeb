import styles from '../css/Leftside1.module.css';
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircleIcon from "@mui/icons-material/Circle";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import { createTheme } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR'
  },
});

theme.typography.subject = {
  fontSize: '1.125rem',
};

//1번 about
function Number1Icon(props) {
  return <LooksOneIcon fontSize="large"  sx={{ color: "#E2B644", ml: -0.5 }} />;
}
//2번 pre-production
function Number2Icon(props) {
  return <LooksTwoIcon fontSize="large" sx={{ color: "#D36767", ml: -0.5 }} />;
}
//3번 production
function Number3Icon(props) {
  return <Looks3Icon fontSize="large" sx={{ color: "#3B74B8", ml: -0.5 }} />;
}
//4번 Post-production
function Number4Icon(props) {
  return <Looks4Icon fontSize="large" sx={{ color: "#318D7C", ml: -0.5 }} />;
}

//1번 about
function Circle1Icon(props) {
  return <CircleIcon fontSize="xsmall" sx={{color: "#E2B644", ml: 0.6 }} />;
}
function Circle11Icon(props) {
    return <CircleIcon fontSize="xsmall" sx={{ color: "#E2B644", ml: 0.6 }} />;
  }
//2번 pre-production
function Circle2Icon(props) {
  return <CircleIcon fontSize="xsmall" color="second" sx={{ color: "#D36767", ml: 0.6 }} />;
}
function Circle22Icon(props) {
    return <CircleIcon fontSize="xsmall" color="second" sx={{ color: "#D36767", ml: 0.6 }} />;
  }
//3번 production
function Circle3Icon(props) {
  return <CircleIcon fontSize="xsmall" color="third" sx={{ color: "#3B74B8", ml: 0.6 }} />;
}
//4번 Post-production
function Circle4Icon(props) {
  return <CircleIcon fontSize="xsmall" color="fourth" sx={{ color: "#318D7C", ml: 0.6 }} />;
}
function Circle44Icon(props) {
    return <CircleIcon fontSize="xsmall" color="fourth" sx={{ color: "#318D7C", ml: 0.6 }} />;
  }

export default function VerticalLinearStepper() {
  const [activeStep] = React.useState(0);


  return (
    <div className={styles.leftsidebox}> 
        <div className={styles.contentscontainer}>
            <div className={styles.gongtong}> 공통 메뉴</div>
                <Link href ='/Notice'>
                    <div className={styles.notice} style={{cursor:'pointer'}}>공지사항</div>
                </Link>
                    <div className={styles.schedule} style={{cursor:'pointer'}}>일정</div> 
                
                    <div className={styles.library} style={{cursor:'pointer'}}>자료실</div>
                    
                    <div className={styles.star} style={{cursor:'pointer'}}>즐겨찾기 자료</div>    
            </div>

            <div className={styles.process}>Process 메뉴</div> 
     
                <Box sx={{ maxWidth: 400}, {mt: 7}}>
                    <Stepper activeStep={activeStep} orientation="vertical" sx={{ color: "gray" }}>
                        <Step completed={false} expanded={true}>
                                <StepLabel StepIconComponent={Number1Icon} > 
                                    <div className={styles.mainLabel} >About</div>
                                </StepLabel>      
                        </Step>
                        
                        <Step completed={false} expanded={true}>
                            <Link href ='/PlanInfoWrite'>
                                <StepLabel sx={{mt: -5}} StepIconComponent={Circle1Icon}>
                                    <Button className={styles.subLabel}>공연기획정보</Button>
                                </StepLabel>
                            </Link>
                        </Step>

                        <Step completed={false} expanded={true}>
                            <Link href ='/TheaterInfoWrite'>
                                <StepLabel sx={{mt: -5}} StepIconComponent={Circle11Icon}>
                                    <Button className={styles.subLabel}>공연장정보</Button>
                                </StepLabel>
                            </Link>
                        </Step>

                        <Step completed={false} expanded={true}>
                        <StepLabel StepIconComponent={Number2Icon}> 
                        <div className={styles.mainLabel}>Pre-Production</div>
                        </StepLabel>
                        </Step>

                        <Step completed={false} expanded={true}>
                            <Link href='/HopeInfoWrite'>
                                <StepLabel sx={{mt: -5}} StepIconComponent={Circle2Icon}>
                                    <Button className={styles.subLabel}>희망연출정보</Button>
                                </StepLabel>
                            </Link>
                        </Step>

                        <Step completed={false} expanded={true}>
                            <Link href='/TechDiscussWrite'>
                                <StepLabel sx={{mt: -5}} StepIconComponent={Circle22Icon}>
                                    <Button className={styles.subLabel}>기술구체화협의 </Button>
                                </StepLabel>
                            </Link>
                        </Step>

                        <Step completed={false} expanded={true}>
                            <StepLabel StepIconComponent={Number3Icon}>
                                <div className={styles.mainLabel}> Production </div>
                            </StepLabel>
                        </Step>

                        <Step completed={false} expanded={true}>
                            <StepLabel sx={{mt: -5}} StepIconComponent={Circle3Icon}> 
                                <Button className={styles.subLabel}>제작공간</Button> 
                            </StepLabel>
                        </Step>

                        <Step completed={false} expanded={true}>
                            <StepLabel StepIconComponent={Number4Icon}>
                                <div className={styles.mainLabel}>Post-Production</div>
                            </StepLabel>
                        </Step>

                        <Step completed={false} expanded={true}>
                            <StepLabel sx={{mt: -5}} StepIconComponent={Circle4Icon}>
                                <Button className={styles.subLabel}>철거 및 반출 협의</Button>
                            </StepLabel>
                        </Step>

                        <Step completed={false} expanded={true}>
                            <StepLabel sx={{mt: -5}} StepIconComponent={Circle44Icon}> 
                                <Button className={styles.subLabel}>협업평가</Button> 
                            </StepLabel>
                        </Step>
                    </Stepper>
                </Box>
    </div>
  );
}
