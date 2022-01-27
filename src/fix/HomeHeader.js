import styles from '../css/HomeHeader.module.css';
import { Button, Divider } from '@mui/material';
import Link from 'next/link';

export default function Header() {
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
          <Button className={styles.menubutton} variant='text'>회원가입</Button>

          <Link href='/Home2'>
            <Button className={styles.loginbutton} variant='contained' color='primary'>로그인</Button>
          </Link>
        </div>
            

        </div>
    );
}
