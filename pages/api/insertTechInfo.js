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
    const user_query = 'SELECT * FROM TECHINFO';

      console.log(req.body.data);
        connection.query(user_query, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
  }

  if(req.method == 'POST') {
    const user_query = 'INSERT INTO TECHINFO VALUES(null, ?, ?, ?, ?, ?)';
    let id = req.body.data.tech_id;
    let name = req.body.data.tech_name;
    let firsubject = req.body.data.tech_1stsubject;
    let secsubject = req.body.data.tech_2ndsubject;
    let contents = req.body.data.tech_contents;
    let addtime = req.body.data.tech_addtime;

    let params = [name, firsubject, secsubject, contents, addtime];
    console.log(req.body.data);
        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}