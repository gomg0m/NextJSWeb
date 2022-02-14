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
  if(req.method == 'GET') {
    const user_query = 'SELECT plan_id FROM PLANINFO ORDER BY plan_id DESC LIMIT 1';
    connection.query(user_query, function (error, result, fields){
      if (error) throw error;
      res.status(200).json({ users: result})
    });
  }

  if(req.method == 'POST') {
    /////plan_image항목은 뺌. File dropzone부분에서 api호출하기 때문
    const user_query = 'INSERT INTO PLANINFO'
    + ' (plan_genre, plan_name, plan_start, plan_end, plan_image, plan_time, plan_number, plan_budget, goal_people, goal_price, plan_contents, plan_exception, plan_file)'
    + ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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