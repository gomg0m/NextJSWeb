import {sign} from 'jsonwebtoken';
import { serialize } from 'cookie';

const secret = process.env.SECRET;


export default function handler(req, res) {

    const {username, password} = req.body;

    console.log("secret",secret);

    if (username == 'Admin' && password =='Admin') {
        const token = sign (
            {
                exp: Math.floor(Date.now()/1000) +60*60*24*30, 
                username : username
            },
            secret
        );
    

    const serialised = serialize("OursiteJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_DEV !== "development",
        sameSite :'strict',
        maxAge: 60*60*24*30,
        path: '/',
    });

    res.setHeader('Set-Cookie', serialised);
    res.status(200).json( { messagge: "Success!"} );
    console.log('success');

    } else {
        
        console.log('Invaild credential');
        return res.json({message:"Invalid credentials!"});


    }
}