import styles from './Header.module.css';
import { Button } from '@mui/material';
export default function Header() {
    return (
        <div className={styles.headerbox}>
             <div className={styles.logocontainer}>
                <div className={styles.logo} > <img src="/images/kitechlogo.svg" alt="logo" width='100px'/></div>
                <div className={styles.logotext}>공연협업공간</div>             
            </div>

            <div className={styles.dash}>대시보드</div>
            <Button className={styles.gobutton} variant='contained' color='inherit' >지식기반 플랫폼 바로가기</Button>
        </div>
    );
}
    