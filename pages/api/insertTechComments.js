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

  if(req.method == 'POST') {
   
    let user_query = 'INSERT INTO TECHCOMMENT'+ req.body.data.tableid 
    + ' (techcomment_name, techcomment_team, techcomment_contents, techcomment_lasttime, techcomment_image)'
    + ' VALUES (?, ?, ?, ?, ?)';

    let name = req.body.data.name;
    let team = req.body.data.team;
    let contents = req.body.data.comment;
    let lasttime = req.body.data.lasttime;
    let image = req.body.data.image;

    let params = [name, team, contents, lasttime, image];

        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}