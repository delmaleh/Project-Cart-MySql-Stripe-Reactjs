const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'daniel',
  password: 'daniel6090',
  database: 'projet'
});

connection.connect();



app.use(express.json());
app.use(cors())

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM orders', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });


  app.listen(port,()=>{console.log("connection started")})