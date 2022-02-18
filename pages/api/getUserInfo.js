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
  if(req.method == 'POST') {
    const user_query = 'INSERT INTO USER'
    + ' (user_name, user_company, user_email, user_password)'
    + ' VALUES (?, ?, ?, ?)';
    let name = req.body.data.user_name;
    let company = req.body.data.user_company;
    let email = req.body.data.user_email;
    let password = req.body.data.user_password;
    
    let params = [name, company, email, password];

    connection.query(user_query, params, function (error, result, fields){
      if (error) throw error;
      
      res.status(200).json({ users: result})
    });
  }
    res.statusCode = 200;
}