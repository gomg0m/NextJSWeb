import { getTableBodyUtilityClass } from '@mui/material';
import React from 'react';
import {useState, useEffect} from 'react';
import Axios from 'axios';

export default function TechCommentBox (props){
    
    //useEffect call func
    // func (Axios.pos(get))
    // get useState

    function getCommentTable(tableID){
        Axios.post("/api/getTechComment", {tableID}).then((res)=>{
            if (res.status == 200 )
            {

            }//Eof res.status

        }); //Eof Axios
    }
    useEffect(()=>{
        getCommentTable(props.tableID);
    })

    return (
        //사진, 이름, 소속, 작성일자, 의견, 이미지

    );
}