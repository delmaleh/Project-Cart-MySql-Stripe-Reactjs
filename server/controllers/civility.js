const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'daniel',
    password: 'daniel6090',
    database: 'projet'
  });

connection.connect();

exports.get_civilities = async (req, res) => {
    
   
    connection.query(`SELECT * FROM Civility`, (error, results) => {
        if (error) throw error;
        res.send(results);
      });
}
