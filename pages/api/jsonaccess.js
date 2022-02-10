import { result } from 'lodash';

const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kitech123!', //password: 'kitech123' //Notebook mysql 
    database: 'nextjsDemo'  
});

// JSON 형식의 'keyword' 테이블 생성 SQL
// CREATE TABLE keyword (
//     id VARCHAR(40) NOT NULL,
//     subscriber JSON,
//     PRIMARY KEY(id)
// );
// 참고: https://blog.naver.com/PostView.naver?blogId=an060875&logNo=222471719719&parentCategoryNo=&categoryNo=19&viewDate=&isShowPopularPosts=true&from=search

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('MySQL Connection Successful.');
});

export default function handler(req, res) {
    if(req.method =='GET'){
        const user_query = 'SELECT * FROM filename WHERE id=?';            
        let params = ["1"];
        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

        res.statusCode = 200;
    }

    if(req.method == 'POST') {
        const user_query = 'UPDATE filename SET fn = ? WHERE id = ?';
        let fileName = JSON.stringify(req.body.data);
        let keyword = "1";
        let params = [keyword, fileName];
        console.log(req.body.data);
            connection.query(user_query, params, function (error, result, fields){
                if (error) throw error;
                res.status(200).json({ users: result})
            });

    res.statusCode = 200;
    }
    
}