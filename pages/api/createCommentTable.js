import { result } from 'lodash';

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

export default function handler(req, res) {
  if(req.method == 'GET') {
    const user_query = 'SELECT plan_id FROM PLANINFO ORDER BY plan_id DESC LIMIT 1';
    connection.query(user_query, function (error, result, fields){
      if (error) throw error;
      res.status(200).json({ users: result})
    });
  }

  if(req.method == 'POST') {
    
    const user_query = 'CREATE TABLE TECHRCOMMENT' 
    + String(req.body.id)
    + '(techcomment_id INT PRIMARY KEY AUTO_INCREMENT, techcomment_name VARCHAR(1024), techcomment_team VARCHAR(1024)'
    + ',techcomment_addtime VARCHAR(1024), techcomment_contents VARCHAR(1024), techcomment_image VARCHAR(1024)'
     + ') DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci';
     

    connection.query(user_query, function (error, result, fields){
        if (error) throw error;
        res.status(200).json({ users: result})
    });

    res.statusCode = 200;
}
    
}