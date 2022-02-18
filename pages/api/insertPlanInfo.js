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
    console.log("req.body.dia",req.body.diglogdata );
    
    const user_query = 'INSERT INTO PLANINFO'
    + ' (plan_genre, plan_name, plan_start, plan_end, plan_firstimage)'
    + ' VALUES (?, ?, ?, ?, ?)';
  
    let genre = req.body.diglogdata.prj_genre;
    let name = req.body.diglogdata.prj_name;
    let start = req.body.diglogdata.prj_start;
    let end = req.body.diglogdata.prj_end;
    let firstimage = req.body.diglogdata.prj_firstimage;

    let params = [genre, name, start, end, firstimage];

    

    connection.query(user_query, params, function (error, result, fields){
        if (error) throw error;
        res.status(200).json({ users: result})
    });

    res.statusCode = 200;
}
    
}