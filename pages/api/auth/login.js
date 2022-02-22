import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

const mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'repledb.c7vqsuewchgh.ap-northeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'kitech123',
  database: 'reple'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('MySQL Connection Successful.');
});



// 코드 내에서 환경변수에 접근할 때는 node.js의 process.env를 사용함
const secret = process.env.SECRET;



export default function handler(req, res) {
    let userEmail = '';
    let userPassword = '';

    if(req.method =='GET'){
        const user_query = 'SELECT user_email, user_password FROM USER';
    
          console.log(req.body.data);
            connection.query(user_query, function (error, result, fields){
                if (error) throw error;
                res.status(200).json({ users: result})
            });
    
        res.statusCode = 200;
      }
    
      if(req.method == 'POST') {
        const user_query = 'SELECT * FROM reple.USERR WHERE user_name=? and user_password=?';
        
        let username = req.body.username;
        let password = req.body.password;
        
        let params = [username, password];
    
        connection.query(user_query, params, function (error, result, fields){
          if (error) throw error;
          console.log("결과", password);
          
        if(result[0]) {
          console.log("result", result[0]);
                // 토큰 생성 (첫 번째 인자: payload, 두 번째 인자: 비밀키)
                const token = sign (
                    {
                        exp: Math.floor(Date.now()/1000) +60*60*24*30, 
                        username : result[0].user_name,
                        email : result[0].user_email,
                        team: result[0].user_team,
                        level: result[0].user_level
                    }, 
                    secret
                );
            
                // 쿠키 생성 => serialize("쿠키 이름", 토큰, 선택사항)
                const serialised = serialize("OursiteJWT", token, {
                    httpOnly: true,  
                    secure: process.env.NODE_DEV !== "development",
                    sameSite :'strict',
                    maxAge: 60*60*24*30,  
                    path: '/',
                });
        
                // 응답을 보내면 해당 쿠키가 요청한 브라우저로 넘어감 
                res.setHeader('Set-Cookie', serialised);
                res.status(200).json( { statusCode: 1} );
                console.log('success');
        
            } else {
                // 인증 정보가 맞지 않으면 에러 메시지 전달
                console.log('Invaild credential');
                res.status(200).json( { statusCode: 2} );
            }
         
        });
        res.statusCode = 200;
        }
}