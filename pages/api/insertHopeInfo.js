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
    const user_query = 'SELECT hope_id FROM HOPEINFO ORDER BY hope_id DESC LIMIT 1';
        connection.query(user_query, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });
  }

  if(req.method == 'POST') {
    /////plan_image항목은 뺌. File dropzone부분에서 api호출하기 때문
    const user_query = 'INSERT INTO HOPEINFO'
    + '(hope_name, hope_image, hope_content, hope_intention, hope_exception, hope_time, hope_budget, hope_tech, hope_reason, hope_reference, hope_addtime)'
    + 'VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let id = req.body.data.hope_id;
    let name = req.body.data.hope_name;
    let image = req.body.data.hope_image;
    let content = req.body.data.hope_content;
    let intention = req.body.data.hope_intention;
    let exception = req.body.data.hope_exception;
    let time = req.body.data.hope_time;
    let budget = req.body.data.hope_budget
    let tech = req.body.data.hope_tech;
    let reason = req.body.data.hope_reason;
    let reference = req.body.data.hope_reference;
    let addtime = req.body.data.hope_addtime;

    let params = [name, image, content, intention, exception, time, budget, tech, reason, reference, addtime];
    
    console.log(req.body.data);

        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}