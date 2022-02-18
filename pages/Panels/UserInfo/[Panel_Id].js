import React, { useState,useEffect, useCallback } from "react";
// import Header from '../../../src/fix/Header';
import Home from '../../Home';
import Axios from 'axios';
import { useRouter } from "next/router";


/////=========== User 메인 페이지 ================================
export default function UserPanel(){ 
  const router = useRouter();
  const {Panel_Id} = router.query;
  const [userInfoTable, setUserInfoTable] = useState([
    {name: '이름', content: ''},
    {name: '소속회사', content: ''},
    {name: '이메일', content: ''},
    {name: '비밀번호', content: ''},
  ]);

  var obj = [...userInfoTable]; //state인 userInfoTable의 변경에 사용할 변수

  
  function getData(id){
    console.log('pageid',Panel_Id);
      Axios.post("/api/getUserInfo", {id} ).then((res) =>{
        //// 가져온 DB값으로 UserInfoTable 변경 => ListViewTable props로 전달
        obj[0].content = res.data.users[0].user_name;
        obj[1].content = res.data.users[0].user_company;
        obj[2].content = res.data.users[0].user_email;
        obj[3].content = res.data.users[0].user_password;

        setUserInfoTable(obj);
      });
  }

  useEffect(() => {
    if(Panel_Id) {    
      getData(Panel_Id);
    } } ,[Panel_Id]);
  
 
  return(
    <>
      console.log(obj);
    </>               
  );
}