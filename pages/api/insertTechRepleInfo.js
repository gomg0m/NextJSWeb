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
    const user_query = 'SELECT * FROM TECHREPLE';

      console.log(req.body.data);
        connection.query(user_query, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
  }

  if(req.method == 'POST') {
   
    let user_query = 'INSERT INTO TECHREPLE'
    + ' (techreple_name, techreple_1stsubject, techreple_2ndsubject, techreple_contents, techreple_image)'
    + ' VALUES (?, ?, ?, ?, ?)';

    let name = req.body.data.techreple_name;
    let firsubject = req.body.data.techreple_1stsubject;
    let secsubject = req.body.data.techreple_2ndsubject;
    let contents = req.body.data.techreple_contents;
    let image = req.body.data.techreple_image;

    let params = [name, firsubject, secsubject, contents, image];

        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}