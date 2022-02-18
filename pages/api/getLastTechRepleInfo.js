//TechDashboard에서 처음 정보 입력할 때!!! 

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

  if(req.method =='GET'){
    const user_query = 'SELECT techreple_id FROM TECHREPLE ORDER BY techreple_id DESC LIMIT 1';

      console.log(req.body.data);
        connection.query(user_query, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
  }

}