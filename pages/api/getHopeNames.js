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
    const user_query = 'SELECT * FROM HOPEINFO';

    connection.query(user_query, function (error, result, fields){
      if (error) throw error;
      res.status(200).json({ users: result})
    });

    res.statusCode = 200;
  }

  if(req.method == 'POST') {
    let user_query = 'SELECT techreple_name, techreple_image, techreple_1stsubject, techreple_2ndsubject, techreple_contents FROM HOPEINFO WHERE techreple_id in (';

    req.body.ids.map((id,i)=>{
      if(i<(req.body.ids.length-1)) user_query += id+',';
      else user_query += id;
    });
    user_query += ')';
    console.log('query',user_query);
    
    connection.query(user_query, function (error, result, fields){
      if (error) throw error;
      
      res.status(200).json({ users: result})
    });
  }
    res.statusCode = 200;
}