import React from 'react';
import Link from 'next/link';
import Header from '../src/fix/HomeHeader';
import Footer from '../src/fix/Footer';
import styles from '../src/css/Home.module.css';
import { Container, Card, CardContent, CardMedia, Typography, CardActionArea, Button, Box } from '@mui/material';


function Home() {
  return (
    <>
      {/* <Header /> */}

      <div className={styles.maintext}>
        공연의 과정이 <br/>
        한 눈에 보이는 협업공간
      </div>
      <div className={styles.subtext}>
        연출, 기술, 디자인팀 모두 하나의 공연에 대한 <br/>
        프로세스별로 의견을 나누고 공유할 수 있습니다.
      </div>
      <img className={styles.homemainimg} alt='home' src='images/homemain.png' />


      <Box className={styles.dbbackground} sx={{ width: 1920, height: 642, backgroundColor: '#F7F7F7', }} />
      <div className={styles.dbtext}>공연 DB</div>
      <div className={styles.cardcontainer}>
      <Card className={styles.card1} sx={{ width: 390, height: 315}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="images/card1.png"
          alt="card1"
        />
        <CardContent>
          <Typography gutterBottom className={styles.homecardtitle} component="div">
            김장훈 콘서트
          </Typography>
          <Typography variant="body2" className={styles.homecardsub}>
            대중음악 콘서트
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card className={styles.card2} sx={{ width: 390, height: 315}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="images/card2.png"
          alt="card2"
        />
        <CardContent>
          <Typography gutterBottom className={styles.homecardtitle} component="div">
            2012 런던 올림픽 개막식
          </Typography>
          <Typography variant="body2" className={styles.homecardsub}>
            대중음악 콘서트
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card className={styles.card3} sx={{ width: 390, height: 315}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="images/card3.png"
          alt="card3"
        />
        <CardContent>
          <Typography gutterBottom className={styles.homecardtitle} component="div">
            미녀와 야수
          </Typography>
          <Typography variant="body2" className={styles.homecardsub}>
            라이센스 뮤지컬
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
      <Button className={styles.moredb} variant="contained" color='inherit'>더 보러가기</Button>
    

    <div className={styles.homenotice}>공지사항</div>
    <div className={styles.cardcontainer2}>
      <Card className={styles.card1} sx={{ width: 390, height: 200}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom className={styles.homecardtitle2} component="div">
            아르코 예술극장 개관 40주년 기념[월간 읽는 극장 6월] 춤추는 시 유튜브 생중계
          </Typography>
          <Typography variant="body2" className={styles.homecardsub2}>
            2021.05.23
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card className={styles.card2} sx={{ width: 390, height: 200}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom className={styles.homecardtitle2} component="div">
            2021년도 3차 아르코, 대학로 예술극장 티켓 안내원 모집 공고
          </Typography>
          <Typography variant="body2" className={styles.homecardsub2}>
            2021.05.23
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card className={styles.card3} sx={{ width: 390, height: 200}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom className={styles.homecardtitle2} component="div">
            [수리완료] 대학로 예술극장 기계식 주차장 운영중단 안내
          </Typography>
          <Typography variant="body2" className={styles.homecardsub2}>
            2021.05.23
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
     <Button className={styles.morenotice} variant="contained" color='inherit'>더 보러가기</Button>
     <Footer />
    </>
  );
}

export default Home;