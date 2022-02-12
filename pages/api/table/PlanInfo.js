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
        const user_query = 'SELECT plan_image FROM PLANINFO WHERE plan_id = ?';            
        let params = ["8"];
        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

        res.statusCode = 200;
    }

    // if(req.method == 'POST') {
    //     const user_query = 'UPDATE filename SET fn = ? WHERE id = ?';
    //     let fileName = JSON.stringify(req.body.newThumb);
    //     let keyword = "1";
    //     let params = [fileName, keyword];
    //     console.log("DB요청 파일명 배열값", req.body.newThumb);
    //         connection.query(user_query, params, function (error, result, fields){
    //             if (error) throw error;
    //             res.status(200).json({ users: result})
    //         });

    // res.statusCode = 200;
    // }
    
}