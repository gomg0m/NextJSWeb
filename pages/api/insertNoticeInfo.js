//TechDashboard에서 처음 정보 입력할 때!!! 

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
   
<<<<<<< HEAD
    let user_query = 'INSERT INTO NOTICEINFO (notice_name, notice_team, notice_title, notice_content, notice_lasttime, notice_image, notice_file)'
    + ' VALUES (?, ?, ?, ?, ?, ?, ?)';

    let name = req.body.data.name;
    let team = req.body.data.team;
    let title = req.body.data.title;
    let contents = req.body.data.content;
=======
    let user_query = 'INSERT INTO NOTICEINFO (notice_name, notice_team, notice_contents, notice_lasttime, notice_image, notice_file)'
    + ' VALUES (?, ?, ?, ?, ?, >)';

    let name = req.body.data.name;
    let team = req.body.data.team;
    let contents = req.body.data.comment;
>>>>>>> 65c28565837fc742d71df425a959bdd8dcee9fc8
    let lasttime = req.body.data.lasttime;
    let image = req.body.data.image;
    let file = req.body.data.file;

<<<<<<< HEAD
    let params = [name, team, title, contents, lasttime, image, file];
=======
    let params = [name, team, contents, lasttime, image, file];
>>>>>>> 65c28565837fc742d71df425a959bdd8dcee9fc8

        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}