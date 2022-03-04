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

  if(req.method =='POST'){
    const user_query = 'SELECT postcomment_id, postcomment_name, postcomment_team, postcomment_lasttime, postcomment_contents, postcomment_image FROM POSTCOMMENT'+ String(req.body.tableID);
    connection.query(user_query, function (error, result, fields){
      if (error) throw error;
      res.status(200).json({ users: result})
    });

    res.statusCode = 200;
  }

}