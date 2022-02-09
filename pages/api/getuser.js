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
    const user_query = 'SELECT * FROM PLANINFO';

      console.log(req.body.data);
        connection.query(user_query, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
  }

  if(req.method == 'POST') {
    const user_query = 'INSERT INTO PLANINFO VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let id = req.body.data.plan_id;
    let time = req.body.data.plan_time;
    let number = req.body.data.plan_number
    let budget = req.body.data.plan_budget;
    let people = req.body.data.goal_people;
    let price = req.body.data.goal_price;
    let context = req.body.data.goal_price;
    let exception =req.body.data.goal_price;
    let file = req.body.data.goal_price;

    let params = [id, time, number, budget, people, price, context, exception, file, file,file,file,file,file,file];
    console.log(req.body.data);
        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}