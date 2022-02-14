import React from 'react';

export default function Child(props){
    const kkk="JK";
    const ClickHandler = ()=>{
        props.func(kkk);
    }
    return(
        <button onClick={ClickHandler}>OK</button>
    )
}
