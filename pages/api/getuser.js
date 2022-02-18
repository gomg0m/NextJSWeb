const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kitech123',
    database: 'nextjsDemo'
});


connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('MySQL Connection Successful.');
});


function getUsers(req, res) {
    const user_query = "select * from users";
    connection.query(user_query, function (error, result, fields){
        if (error) throw error;
        res.status(200).json({ users: result})
    })
}


export default getUsers;