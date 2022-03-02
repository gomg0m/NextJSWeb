import {useState, useEffect} from 'react';
import Axios from 'axios';

export default function circleImage(){
    const [imgName, setImgName] = useState();
    const [userName, setUserName]= useState();
    const [teamName, setTeamName] = useState();

    function getUser(){
        const user = Axios.get('/api/getUserCookieInfo').then((res)=> {
            // console.log('l',res.data.user);
            if (res.status == 200) {
              if (res.data.statusCode == 1) { //쿠키 있을때 처리 루프
                console.log(res.data.user);
                let imgname = "/uploads/" + res.data.user.username + ".jpg";
                setImgName(imgname);
                setUserName(res.data.user.username);
                setTeamName(res.data.user.team);
                
              } else {  //쿠키 없을떄 처리 루프
                console.log(res.data.user);
    
              } 
    
            } else {
                // res.status Error 처리
            }
          }); 
    }

    useEffect(()=>{
        let user = getUser();
        //let imgname = "/uploads/" + user.username + ".jpg";
        console.log("user",user);
        //setImgName(imgname);
        //setUserName(user.username);
        //setTeamName(user.team);
    },[])
    return(
        <div>
            <img src={imgName} style={{width:48, height:48, borderRadius:48/2}}></img>
            <div>{userName}</div>
            <div>{teamName}</div>
        </div>
    )
}