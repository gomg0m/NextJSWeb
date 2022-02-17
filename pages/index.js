import Axios from 'axios';
import React, {useState} from 'react';

export default function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <div style={mainDivStyle}>
            <form style={formStyle} onSubmit={e=>handleSubmit(e)}>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' id='username' onChange={e=>setUsername(e.target.value)}></input>
                
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' onChange={e=>setPassword(e.target.value)}></input>

                <button> Log in </button>
                
            </form>
        </div>
    );
};
