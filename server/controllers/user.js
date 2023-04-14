const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'daniel',
    password: 'daniel6090',
    database: 'projet'
  });

connection.connect();

exports.get_user_login = async (req, res) => {
  const { Customer_Email, Password } = req.body;
    connection.query(`SELECT * FROM customer where Customer_Email='${Customer_Email}'`, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          const user = results[0];
          console.log(user);
          bcrypt.compare(Password, user.Password, (err, result) => {
            if (err) throw err;
            const userId= user.customer_id
            if (result) {
              const token = jwt.sign({ userId }, 'SECRET_KEY');
              res.json({ token });
            } else {
              res.status(401).json({ message: 'Mot de passe incorrect.' });
            }
          });
        } else {
          res.status(401).json({ message: "L'utilisateur n'existe pas." });
        }
      }
     

 /*       const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'react_login',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

const SECRET_KEY = 'secret';

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (error, results, fields) => {
      if (error) throw error;

      if (results.length > 0) {
        const user = results[0];

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;

          if (result) {
            const token = jwt.sign({ username }, SECRET_KEY);
            res.json({ token });
          } else {
            res.status(401).json({ message: 'Mot de passe incorrect.' });
          }
        });
      } else {
        res.status(401).json({ message: "L'utilisateur n'existe pas." });
      }
    }
  );
});

app.listen(5000, () => {
  console.log('Server started on port 5000.');
});
*/
        
        
        //res.send(results);
   );
}


exports.get_user = async (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM customer WHERE customer_id=${id}`, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  };

  exports.check_userId = async (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM customer WHERE customer_id='${id}'`, (error, results) => {
        if (error) return reject(error);
        resolve(results.length > 0);
      });
    });
  };
  
  exports.check_token = (req, res) => {
    return res.status(200).json({userId: req.user_id});
  }




  exports.get_users = async (req, res) => {
    
    connection.query(`SELECT * FROM customer `, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  };

  exports.create_user = async (req, res) => {
    const { First_Name, Last_Name, Customer_Email, Phone,Password } = req.body;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(Password, salt);
    connection.query(
      `INSERT INTO customer (First_Name, Last_Name, Customer_Email, Phone,Password) VALUES ('${First_Name}', '${Last_Name}', '${Customer_Email}', '${Phone}','${hash}')`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
  };
  
  exports.update_user = async (req, res) => {
    const { First_Name, Last_Name, Customer_Email, Phone } = req.body;
    const { id } = req.params;
    connection.query(
      `UPDATE customer SET First_Name='${First_Name}', Last_Name='${Last_Name}', Customer_Email='${Customer_Email}', Phone='${Phone}' WHERE customer_id=${id}`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );

  };
  
  exports.delete_user = async (req, res) => {
    const { id } = req.params;
    connection.query(
      `DELETE FROM customer WHERE customer_id=${id}`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
  };
