import React, {useState} from 'react';
import Child from './tstChild';

export default function ParentView(){
    const kkk = [{name:"JinMin", number:1}, {name:"Daye", number:2}];
    const jjj = ["k","j", "y"];
    const [val, setVal]=useState("");

    console.log(kkk);
    function getChildData(data){
        setVal(data);
    }
    return (
        <div>
        <Child kjy={kkk} func={getChildData}/>
        <h1>{val}</h1>
        </div>
    );
};