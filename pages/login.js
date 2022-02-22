import React, { useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";


export default function Login(){

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {username, password};

        
        // 사용자로부터 입력받은 이름, 비밀번호를 auth/login으로 보냄
        const user = Axios.post('/api/auth/login', credentials).then((res)=> {
            console.log('l',res);
            if (res.status == 200) {
                console.log(res.data.users);
                if(res.data.statusCode == 1) {
                    //router.push('/Home2');
                }

                if(res.data.statusCode == 2) {
                    //router.push('/Home');
                    console.log("fail!!!")
                }
                console.log("fail!!!", res.data)
            }
                
        })  
        } ;
    

    // css 속성 (순서대로)
    const formSty = { display:'flex', flexDirection: 'column', maxWidth: '500px', marginTop: '10rem', marginLeft: '45rem' };
    const log_group = { background: "#F6F6F6"};

    const logoSty = { marginTop: '1rem', marginLeft: '9.5rem' };
    const titleSty = { fontSize: "1.7rem", marginLeft: '3rem', fontWeight: 'bold' };

    const labelSty1 = {
        marginTop: '1.5rem',
        padding: ".375rem .75rem",
        // border: "1px solid teal",
        // borderRadius: ".25rem",
        fontSize: "1.5rem",
        lineHeight: 1.5,
    };

    const labelSty2 = {
        padding: ".375rem .75rem",
        // border: "1px solid teal",
        // borderRadius: ".25rem",
        fontSize: "1.5rem",
        lineHeight: 1.5,
    };

    const inputSty1 = { padding: ".3rem .75rem", border: "1px solid", borderRadius: ".25rem", fontSize: "1rem" };
    const inputSty2 = { padding: ".3rem .75rem", border: "1px solid", borderRadius: ".25rem", fontSize: "1rem" };

    const loginbtn = { padding: ".3rem .75rem", border: "1px solid #99CCFF", borderRadius: ".25rem", fontSize: "1rem", 
        marginTop: "1rem", background: "#99CCFF", transitionduration: "0.3s", color: "white" };
    const copyright = { padding: ".3rem .75rem", marginTop: "3rem", marginLeft: "4rem", color: "#808080"}
    
      

    return (
        <div style={log_group}>
            <form style={formSty} onSubmit={e=>handleSubmit(e)}>
                <div style={logoSty}><img src="images/kitechlogo.svg" alt="logo" width='200px'/></div>
                <label style={titleSty}>첨단융합공연 지식기반정보플랫폼</label>

                <label style={labelSty1} htmlFor='username'>UserName</label>
                <input style={inputSty1} type='username' name='username' id='username' onChange={e=>setUserName(e.target.value)}></input>

                <label style={labelSty2} htmlFor='password'>Password</label>
                <input style={inputSty2} type='password' name='password' id='password' onChange={e=>setPassword(e.target.value)}></input>

                <button style={loginbtn}> 로그인 </button>
                <label style={copyright}>Copyright ⓒ 2022 Kitech. All Rights Reserved</label>
            </form>
        </div>
    );
};