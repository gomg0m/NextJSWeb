import { result } from 'lodash';

const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kitech123!', //password: 'kitech123' //Notebook mysql 
    database: 'nextjsDemo'  
});

// PLAN 테이블 생성 SQL
  //   CREATE TABLE PLAN (
  //     plan_id INT PRIMARY KEY AUTO_INCREMENT, 
  //     plan_genre VARCHAR(1024), 
  //     plan_name VARCHAR(1024), 
  //     plan_start VARCHAR(1024),
  //     plan_end VARCHAR(1024),
  //      plan_image VARCHAR(1024),
  //      plan_time VARCHAR(1024),
  //      plan_number VARCHAR(1024),
  //      plan_budget VARCHAR(1024),
  //      goal_people VARCHAR(1024),
  //      goal_price VARCHAR(1024),
  //      plan_contents VARCHAR(2000),
  //      plan_exception VARCHAR(2000),
  //      plan_file VARCHAR(80)
  //  ) DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('MySQL Connection Successful.');
});

export default function handler(req, res) {

  if(req.method =='GET'){
    const user_query = 'SELECT * FROM PLAN';
          
        connection.query(user_query, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
  }

  if(req.method == 'POST') {
    const user_query = 'INSERT INTO PLAN VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let id = req.body.data.plan_id;
    let genre = req.body.data.plan_genre;
    let name = req.body.data.plan_name;
    let start = req.body.data.plan_start;
    let end = req.body.data.plan_end;
    let image = req.body.data.plan_image;
    let time = req.body.data.plan_time;
    let number = req.body.data.plan_number
    let budget = req.body.data.plan_budget;
    let people = req.body.data.goal_people;
    let price = req.body.data.goal_price;
    let contents = req.body.data.plan_contents;
    let exception =req.body.data.plan_exception;
    let file = req.body.data.plan_file;

    let params = [genre, name, start, end, image, time, number, budget, people, price, contents, exception, file];
    console.log(req.body.data);
        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}