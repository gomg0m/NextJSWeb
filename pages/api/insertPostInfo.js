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
    console.log("req.body.dia",req.body.dialogdata );
    
    const user_query = 'INSERT INTO POSTINFO'
    + ' (post_type,post_hope, post_discussname, post_firstimage, post_lasttime)'
    + ' VALUES (?, ?, ?, ?, ?)';

    let type = req.body.dialogdata.prj_type;
    let hope = req.body.dialogdata.prj_hope;
    let discussname = req.body.dialogdata.prj_discussname;
    let firstimage = req.body.dialogdata.prj_firstimage;
    let lasttime = req.body.dialogdata.prj_lasttime;

    let params = [type, hope, discussname, firstimage, lasttime];

        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}