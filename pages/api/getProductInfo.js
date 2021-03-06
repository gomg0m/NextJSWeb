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
    const user_query = 'SELECT product_id, product_name, product_discussname, product_firstimage, product_hope, product_lasttime FROM PRODUCTINFO';

    connection.query(user_query, function (error, result, fields){
      if (error) throw error;
      res.status(200).json({ users: result})
    });

    res.statusCode = 200;
  }

  if(req.method == 'POST') {
    const user_query = 'SELECT * FROM PRODUCTINFO WHERE product_id = ? ';

    let params = [req.body.id];
    connection.query(user_query, params, function (error, result, fields){
      if (error) throw error;
      res.status(200).json({ users: result})
    });  
}
    res.statusCode = 200;
}