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
   
    let user_query = 'INSERT INTO POSTREPLE'
    + ' (postreple_name, postreple_1stsubject, postreple_2ndsubject, postreple_contents, postreple_image, postreple_lasttime)'
    + ' VALUES (?, ?, ?, ?, ?, ?)';

    let name = req.body.idata.postreple_name;
    let firsubject = req.body.idata.postreple_1stsubject;
    let secsubject = req.body.idata.postreple_2ndsubject;
    let contents = req.body.idata.postreple_contents;
    let image = req.body.idata.postreple_image;
    let lasttime = req.body.idata.postreple_lasttime;

    let params = [name, firsubject, secsubject, contents, image, lasttime];

        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}