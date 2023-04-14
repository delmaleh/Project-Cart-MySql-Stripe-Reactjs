const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'daniel',
    password: 'daniel6090',
    database: 'projet'
  });

connection.connect();

exports.get_products = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    connection.query(`SELECT * FROM Product where Category_id=${id}`, (error, results) => {
        if (error) throw error;
        res.send(results);
      });
}

exports.get_search_products  = async (req, res) => {
  const { id } = req.params;
  console.log(`SELECT * FROM product WHERE Product_Name LIKE '%${id}%'`)
  connection.query(`SELECT * FROM product WHERE Product_Name LIKE '%${id}%'`, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
}

exports.get_parent_products  = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  connection.query(`SELECT * FROM Product,Category 
  where Category.Category_id=Product.Category_id and Parent_id=${id}`, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
}
/*SELECT * FROM Product,Category 
        where Category.Category_id=Product.Category_id and Stock>0 and Parent_id=".$parentcatid;
    $result = mysqli_query($conn, $sql);
*/
exports.get_product = async (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM Product WHERE Product_id=${id}`, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  };

  exports.create_product = async (req, res) => {
    const { Product_Name, Product_Description,Image1,Image2,Image3,Price,Stock,Category_id} = req.body;
    connection.query(
      `INSERT INTO product (Product_Name, Product_Description,Image1,Image2,Image3,Price,Stock,Category_id) VALUES ('${new String(Product_Name).replace("'","\''")}', '${new String(Product_Description).replace("'","\''")}','${Image1}','${Image2}','${Image3}','${Price}','${Stock}','${Category_id}')`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
  };

  exports.update_product = async (req, res) => {
    const { Product_Name, Product_Description,Image1,Image2,Image3,Price,Stock,Category_id} = req.body;
    //console.log('Img',Image1,Image2,Image3);
    const { id } = req.params;
    connection.query(
      `UPDATE product SET Product_Name='${new String(Product_Name).replace("'","\''")}', Product_Description='${new String(Product_Description).replace("'","\''")}',Image1='${Image1}',Image2='${Image2}',Image3='${Image3}',Price='${Price}',Stock='${Stock}',Category_id='${Category_id}' WHERE product_id=${id}`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );

  };
  exports.delete_product = async (req, res) => {
    const { id } = req.params;
    connection.query(
      `DELETE FROM Product WHERE Product_id=${id}`,
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
  };