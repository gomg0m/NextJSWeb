import React from 'react';
import {useState} from 'react';
import TSTChild from './tstChildTab';
import Button from '@mui/material/Button';

var jjj = 0;
export default function tstParent(){
    
    const [kkk, setKKK] = useState(0);
    function hadleClick()
    {
        jjj++;
        setKKK(jjj);
    }
    return(
      <>
        <div>
           <Button onClick={hadleClick}>{kkk}</Button>
           <TSTChild vv={kkk} />
        </div>
      </>
    );
};
