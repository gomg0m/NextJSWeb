import React from 'react';
import {useState} from 'react';

export default function tstChild(props) {
    let yyy = 12;
    yyy=yyy+props.vv;
    return(
      <>
        <div>
          {props.vv}
          {yyy}
        </div>
      </>
    );
};
