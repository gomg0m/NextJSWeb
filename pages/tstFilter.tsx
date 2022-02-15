import React from 'react';
import {useState} from 'react';
const data = ["김진영", "조자양", "김승조", "윤다예", "김지만"];
export const FilterTest= () => {
    const [v, setV] = useState('');

    const handleOnChange = (e)=>{
              
        let kkk=data.filter((item)=>{return item.search(e.target.value)!=-1});
        console.log(kkk);  
        setV(kkk);

    }
    return(
        <div><input onChange={handleOnChange} />{v}</div>

    )
}
export default FilterTest;
