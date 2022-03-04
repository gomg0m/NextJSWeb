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
    const user_query = 'SELECT * FROM PRODUCTINFO';

      console.log(req.body.data);
        connection.query(user_query, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
  }

  if(req.method == 'POST') {
      console.log('req',req.body.ids);
      let user_query ='SELECT product_id, product_hope, product_discussname, product_firstimage, product_lasttime FROM PRODUCTINFO WHERE product_id in (';
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