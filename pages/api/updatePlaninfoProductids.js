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
    const user_query = 'UPDATE PLANINFO SET plan_productids=? WHERE plan_id = ?';
    
    let planid = req.body.data.plan_id;
    let planids = req.body.data.plan_productids;

    let params = [planids, planid];

    connection.query(user_query, params, function (error, result, fields){
        if (error) throw error;
        res.status(200).json({ users: result})
    });

    res.statusCode = 200;
}
    
}