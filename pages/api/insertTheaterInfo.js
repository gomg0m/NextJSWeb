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
    + ' (theater_id, theater_place, theater_seatnumber, theater_size, theater_drawing, theater_exterior, theater_interior, theater_seatinformation, theater_exception, theater_addtime)'
    + ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let id = req.body.data.theater_id;
    let place = req.body.data.theater_place;
    let seatnumber = req.body.data.theater_seatnumber;
    let size = req.body.data.theater_size;
    let drawing = req.body.data.theater_drawing;
    let exterior = req.body.data.theater_exterior;
    let interior = req.body.data.theater_interior;
    let seatinformation = req.body.data.theater_seatinformation
    let exception = req.body.data.theater_exception;
    let addtime = req.body.data.theater_addtime;

    let params = [id, place, seatnumber, size, drawing, exterior, interior, seatinformation, exception, addtime];

    console.log(req.body.data);

    connection.query(user_query, params, function (error, result, fields){
        if (error) throw error;
        res.status(200).json({ users: result})
    });

    res.statusCode = 200;
}

}