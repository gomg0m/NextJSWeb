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
   
    let user_query = 'INSERT INTO PRODUCTREPLE'
    + ' (prdtreple_name, prdtreple_1stsubject, prdtreple_2ndsubject, prdtreple_contents, prdtreple_image, prdtreple_lasttime)'
    + ' VALUES (?, ?, ?, ?, ?, ?)';

    let name = req.body.idata.prdtreple_name;
    let firsubject = req.body.idata.prdtreple_1stsubject;
    let secsubject = req.body.idata.prdtreple_2ndsubject;
    let contents = req.body.idata.prdtreple_contents;
    let image = req.body.idata.prdtreple_image;
    let lasttime = req.body.idata.prdtreple_lasttime;

    let params = [name, firsubject, secsubject, contents, image, lasttime];

        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}