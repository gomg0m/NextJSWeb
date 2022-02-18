import React from 'react';
import Axios from 'axios';


export default function tstLogIn(){

const mainDivStyle = {
    padding : '1em'
}

const formStyle = {display:'flex', flexDirection: 'column', maxWidth: '560px'};

const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {username, password};

    const user = Axios.post('/api/auth/login', credentials).then((res)=> {
        console.log(user);
    } );                
}

const handleClick = async() => {
    const user = await Axios.get('/api/user');
    
}

return (
    <div style={mainDivStyle}>
        <form style={formStyle} onSubmit={e=>handleSubmit(e)}>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' id='username' onChange={e=>setUsername(e.target.value)}></input>
            
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' onChange={e=>setPassword(e.target.value)}></input>

            <button> Log in </button>

            <button onClick={handleClick}> User </button>
            
        </form>
    </div>
    );
}