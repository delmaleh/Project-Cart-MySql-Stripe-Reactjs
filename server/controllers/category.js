const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'daniel',
    password: 'daniel6090',
    database: 'projet'
  });

connection.connect();

exports.get_categories = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    connection.query(`SELECT * FROM category where Parent_id=${id}`, (error, results) => {
        if (error) throw error;
        res.send(results);
      });
}

exports.get_category = async (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM category WHERE Category_id=${id}`, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  };

  exports.create_category = async (req, res) => {
    const { Category_Name, Category_Description,Parent_id} = req.body;
    connection.query(
      `INSERT INTO category (Category_Name, Category_Description,Parent_id) VALUES ('${Category_Name}', '${Category_Description}','${Parent_id}')`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
  };

  exports.update_category = async (req, res) => {
    const { Category_Name, Category_Description} = req.body;
    const { id } = req.params;
    connection.query(
      `UPDATE category SET Category_Name='${Category_Name}', Category_Description='${Category_Description}' WHERE category_id=${id}`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );

  };
  exports.delete_category = async (req, res) => {
    const { id } = req.params;
    connection.query(
      `DELETE FROM category WHERE Category_id=${id}`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
  };