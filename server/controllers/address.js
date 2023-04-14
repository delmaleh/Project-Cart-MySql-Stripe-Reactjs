const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'daniel',
    password: 'daniel6090',
    database: 'projet'
  });

connection.connect();

exports.get_addresses = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    connection.query(`SELECT * FROM Address where Customer_id=${id}`, (error, results) => {
        if (error) throw error;
        res.send(results);
      });
}

exports.get_address = async (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM Address where Address_id=${id}`, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  };

  exports.get_default_address = async (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM Customer where Customer_id=${id} And Default_Address=1`, (error, results) => {
      if (error) throw error;
      if (results.length > 0)
         res.send(results);
      else 
        connection.query(`SELECT * FROM Address where Customer_id=${id} And Default_Address=1`, (error, results) => {
            if (error) throw error;
 
            res.send(results);
            
        });
    });
        
  };

  
  exports.create_address = async (req, res) => {
    const {Address, Postcode,City,First_Name,Last_Name,Title,Default_Address,Country_id,Civility_id,Phone,Customer_id,customer_id} = req.body;
    console.log('Customer_id',Customer_id)
    //const { id } = req.params;
    console.log(Address, Postcode,City,First_Name,Last_Name,Title,Default_Address,Country_id,Civility_id,Phone,Customer_id)
    connection.query(
      `INSERT INTO address (Address, Postcode,City,First_Name,Last_Name,Title,Default_Address,Country_id,Civility_id,Phone,Customer_id) VALUES ('${Address}', '${Postcode}','${City}','${First_Name}','${Last_Name}','${Title}','${Default_Address}','${Country_id}','${Civility_id}','${Phone}','${Customer_id}')`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
  };
  
  exports.update_default_address = async (req, res) => {
    const { id } = req.params;
    connection.query(
        `UPDATE ADDRESS SET Default_Address=0 where Customer_id='${id}' `,
        (error, result) => {
          if (error) throw error;
          res.send(result);
        }
      );
  };
  exports.update_default_customer_address = async (req, res) => {
    const { id } = req.params;
    connection.query(
        `UPDATE Customer SET Default_Address=0 where Customer_id='${id}' `,
        (error, result) => {
          if (error) throw error;
          res.send(result);
        }
      );
  };
  exports.update_customer_address = async (req, res) => {
    const {Address, Postcode,City,First_Name,Last_Name,Title,Default_Address,Country_id,Civility_id,Phone,Customer_id} = req.body;
    const { id } = req.params;
    connection.query(
        `UPDATE customer SET Address='${Address}', Postcode='${Postcode}', City='${City}', First_Name='${First_Name}', Last_Name='${Last_Name}', Title='${Title}', Default_Address='${Default_Address}', Country_id='${Country_id}', Civility_id='${Civility_id}', Phone='${Phone}' WHERE Customer_id=${id}`,
         (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
  };

  exports.update_address = async (req, res) => {
    const {Address, Postcode,City,First_Name,Last_Name,Title,Default_Address,Country_id,Civility_id,Phone,Customer_id} = req.body;
    const { id } = req.params;
    connection.query(
      `UPDATE address SET Address='${Address}', Postcode='${Postcode}', City='${City}', First_Name='${First_Name}', Last_Name='${Last_Name}', Title='${Title}', Default_Address='${Default_Address}', Country_id='${Country_id}', Civility_id='${Civility_id}', Phone='${Phone}', Customer_id='${Customer_id}' WHERE Address_id=${id}`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );

  };
  exports.delete_address = async (req, res) => {
    const { id } = req.params;
    connection.query(
      `DELETE FROM address WHERE Address_id=${id}`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
  };