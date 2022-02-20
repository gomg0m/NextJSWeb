import React from 'react';
import sty from './tstCSS.module.css';

export default function tstCss(){
    return(
        <>
        <div>
           <p> Hello </p>
            안녕하세요~~~~
        </div>
        <div className={sty.fontTst2}>
            <div> Hello </div>
           <div> 안녕하세요^^ </div>
        </div>
        <div>
            김진영입니다.
        </div>
        </>
    )
}
