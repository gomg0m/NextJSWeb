import 'moment/locale/ko';
import moment from 'moment';
import React, {useEffect} from 'react';

export default function TestMoment(){

    useEffect(()=>{
        //moment.locale('ko'); //한국어 시간 출력
        moment.locale('en'); //영어 시간 출력
        let date = new Date(2022,1,14,9,10,22)
        console.log(moment().format('LT'));
        console.log(moment().format('LTS'));
        console.log(moment().format('L'));
        console.log(moment().format('l'));
        console.log(moment().format('LL'));
        console.log(moment().format('ll'));
        console.log(moment().format('LLL'));
        console.log(moment().format('lll'));
        console.log(moment(date).format('LLLL'));
        console.log(moment(date).format('llll'));
        console.log('Good~')
        let jjj = moment(date).format('llll');
        let kkk = typeof jjj;
        let yyy = new Date(jjj);  //영어로 되어 있을때만 변환 가능
        console.log('TypeOf', yyy)
    },[])

    return(
        <div></div>
    )
}