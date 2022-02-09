import styles from '../css/HomeHeader2.module.css';
import { Button, Divider } from '@mui/material';
import Link from 'next/link';

export default function Header2() {
    return (
        <div className={styles.headerbox}>
             <div className={styles.logocontainer}>
                <div className={styles.logo} > <img src="images/kitechlogo.svg" alt="logo" width='100px'/></div>
                <div className={styles.logotext}>첨단융합공연 지식기반정보플랫폼</div>             
            </div>

        <div className={styles.headercontainer}>
          <Button className={styles.menubutton} variant='text'>소개</Button>
          <Button className={styles.menubutton} variant='text'>공연DB</Button>
          <Button className={styles.menubutton} variant='text'>공지사항</Button>
          <Divider orientation="vertical" variant="middle" flexItem />

          <Link href='/Home'>
          <Button className={styles.menubutton} variant='text'>로그아웃</Button>
          </Link>

          <Link href='/Show'>
          <Button className={styles.gobutton} variant='contained' color='primary'>공간 협업공간 가기</Button>
          </Link>
        </div>
        </div>
    );
}
