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
    /////plan_image항목은 뺌. File dropzone부분에서 api호출하기 때문
    const user_query = 'UPDATE TECHINFO SET tech_repleids=? WHERE tech_id = ?';
    
    let id = req.body.data.tech_id;
    let repleids = req.body.data.tech_repleids;

    let params = [repleids, id];

    console.log(req.body.data);

    connection.query(user_query, params, function (error, result, fields){
        if (error) throw error;
        res.status(200).json({ users: result})
    });

    res.statusCode = 200;
}
    
}