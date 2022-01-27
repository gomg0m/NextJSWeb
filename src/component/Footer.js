import styles from './Footer.module.css';

export default function Footer() {
    return (
        <div className={styles.footerbox}>
             <div className={styles.logocontainer}>
                <div className={styles.userule}>이용약관</div>
                <div className={styles.perinfo}>개인정보 처리방침</div>             
                <div className={styles.cs}>고객센터</div>    
            </div>
            <div className={styles.logo} > <img src="/images/kitechlogo.svg" alt="logo" width='100px'/></div>
        </div>
    );
}
    