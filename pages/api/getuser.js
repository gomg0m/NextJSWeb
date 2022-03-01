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


function getUsers(req, res) {
    const user_query = "SELECT user_name FROM USERR ";
    connection.query(user_query, function (error, result, fields){
        if (error) throw error;
        res.status(200).json({ users: result})
    })
}


export default getUsers;