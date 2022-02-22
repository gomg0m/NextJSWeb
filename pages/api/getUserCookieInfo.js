import { verify } from 'jsonwebtoken';

const secret = process.env.SECRET;

export default function handler(req, res) {
  
  if(req.method =='GET'){
    const { cookies } = req;


    const jwt = cookies.OursiteJWT;

    if(jwt) {
      const url = req.url;

      const user = verify(jwt, secret);

      // console.log(user);

      res.status(200).json( { user, statusCode: 1 } );
    } else {
      console.log('Invaild credential!!!');
      res.status(200).json( { statusCode: 2} );
    }
  }
  
}