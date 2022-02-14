import { result } from 'lodash';

const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'repledb.c7vqsuewchgh.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'kitech123',
    database: 'reple'
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
    // if(req.method =='GET'){
    //     const user_query = 'SELECT * FROM filename';            
    //     let params = ["1"];
    //     connection.query(user_query, params, function (error, result, fields){
    //         if (error) throw error;
    //         res.status(200).json({ users: result})
    //     });

    //     res.statusCode = 200;
    // }

    if(req.method == 'POST') {
        const user_query = 'UPDATE PLANINFO SET plan_image = ? WHERE plan_id = ?';
        let fileName = JSON.stringify(req.body.newThumb);
        let keyword = "8";
        let params = [fileName, keyword];
        console.log("DB요청 파일명 배열값", req.body.newThumb);
            connection.query(user_query, params, function (error, result, fields){
                if (error) throw error;
                res.status(200).json({ users: result})
            });

    res.statusCode = 200;
    }
    
}