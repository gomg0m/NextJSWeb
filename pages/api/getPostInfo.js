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
    const user_query = 'SELECT post_type, post_id, post_name, post_discussname, post_firstimage, post_hope, post_lasttime FROM POSTINFO';

    connection.query(user_query, function (error, result, fields){
      if (error) throw error;
      res.status(200).json({ users: result})
    });

    res.statusCode = 200;
  }

  if(req.method == 'POST') {
    const user_query = 'SELECT * FROM POSTINFO WHERE post_id = ? ';

    let params = [req.body.id];
    connection.query(user_query, params, function (error, result, fields){
      if (error) throw error;
      res.status(200).json({ users: result})
    });  
}
    res.statusCode = 200;
}