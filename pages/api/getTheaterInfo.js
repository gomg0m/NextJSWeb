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
    const user_query = 'SELECT * FROM HALLINFO';

      console.log(req.body.data);
        connection.query(user_query, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
  }

  if(req.method == 'POST') {
    const user_query = 'INSERT INTO HALLINFO VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let id = req.body.data.concerthall_id;
    let place = req.body.data.hall_place;
    let seatnumber = req.body.data.hall_seatnumber;
    let size = req.body.data.hall_size;
    let blueprint = req.body.data.hall_blueprint;
    let exterior = req.body.data.hall_exterior;
    let interior = req.body.data.hall_interior;
    let seatinformation = req.body.data.hall_seatinformation
    let exception = req.body.data.hall_exception;
    let addtime = req.body.data.hall_addtime;

    let params = [place, seatnumber, size, blueprint, exterior, interior, seatinformation, exception, addtime];
    console.log(req.body.data);
        connection.query(user_query, params, function (error, result, fields){
            if (error) throw error;
            res.status(200).json({ users: result})
        });

    res.statusCode = 200;
}
    
}