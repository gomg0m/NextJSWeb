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
    const user_query = 'UPDATE TECHINFO SET'
    + ' tech_hope=?, tech_discussname=?, tech_name=?, tech_1stsubject=?, tech_2ndsubject=?'
    + ', tech_contents=?, tech_image=?, tech_addtime=?'
    + ' WHERE plan_id = ?';
    
    let id = req.body.data.tech_id;
    let hope = req.body.data.tech_hope;
    let name = req.body.data.tech_discussname;
    let name = req.body.data.tech_name;
    let firsubject = req.body.data.tech_1stsubject;
    let secsubject = req.body.data.tech_2ndsubject;
    let contents = req.body.data.tech_contents;
    let image = req.body.data.tech_image;
    let addtime = req.body.data.tech_addtime;

    let params = [id, hope, discussname, name, firsubject, secsubject, contents, image, addtime];

    console.log(req.body.data);

    connection.query(user_query, params, function (error, result, fields){
        if (error) throw error;
        res.status(200).json({ users: result})
    });

    res.statusCode = 200;
}
    
}