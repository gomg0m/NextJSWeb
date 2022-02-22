import { useState } from 'react';
import Axios from 'axios';


export default function testCookie () {
  
  const [name, setName] = useState({name:"", email: "", password: "", level: ""});
 
  const user = Axios.get('/api/getUserCookieInfo').then((res)=> {
    // console.log('l',res.data.user);
    if (res.status == 200) {
      if (res.data.statusCode == 1) {
        setName({name:res.data.user.username, email: res.data.user.email, team: res.data.user.team, level: res.data.user.level});
      }
    } else {
      setName("fail");
    }

  }); 


  // console.log(user);

  return (
    <>
      <div>{name.email}, {name.level}, {name.team}</div>
    </>
  )
}