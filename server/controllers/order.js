/*$conn=$dbCon->OpenCon();
        $sql= "INSERT INTO orders(Customer_id) values('".$custid."')";
        $result = mysqli_query($conn, $sql);
        $orderId=mysqli_insert_id($conn);
        foreach ($articles as $value){
            $products= new Products();
            $product=$products->getProduct($value["productid"]);
            $totalProd=$product["Price"]*$value["qty"];
            $stock=$product["Stock"]-$value["qty"];
            $sql= "UPDATE product SET Stock='".$stock."' where Product_id=".$value["productid"];    
            $result = mysqli_query($conn, $sql);
            $sql= "INSERT INTO order_details(Order_id,Product_id,Product_qty,Product_Price,Subtotal) VALUES('";
            $sql.=$orderId."','";
            $sql.=$value["productid"]."','";
            $sql.=$value["qty"]."','";
            $sql.=$product["Price"]."','";
            $sql.=$totalProd."')";
            $result = mysqli_query($conn, $sql);    
            $total+=$totalProd;
        }
        $sql= "UPDATE orders SET Order_Total='".$total."' where Order_id=".$orderId;
 */
        const mysql = require('mysql');
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'daniel',
            password: 'daniel6090',
            database: 'projet'
          });
        
        connection.connect();
        
        exports.get_orders = async (req, res) => {
            const { id } = req.params;
            console.log(id)
            connection.query(`SELECT * FROM orders WHERE Customer_id=${id}`, (error, results) => {
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
        
          exports.create_order = async (req, res) => {
            const { id } = req.params;
            console.log(`INSERT INTO orders (Customer_id) VALUES ('${id}')`);
            connection.query(
              `INSERT INTO orders (Customer_id) VALUES ('${id}')`,
              (error, result) => {
                if (error) throw error;
                const lastInsertedId = result.insertId;
                return res.status(200).json({ lastInsertedId });
                
              }
            );
          };

          exports.create_order_details = async (req, res) => {
            const {Order_id,Product_id,Product_qty,Product_Price,Subtotal} = req.body;
            console.log(`INSERT INTO order_details(Order_id,Product_id,Product_qty,Product_Price,Subtotal) VALUES('${Order_id}','${Product_id}','${Product_qty}','${Product_Price}','${Subtotal}')`)
            connection.query(
              `INSERT INTO order_details(Order_id,Product_id,Product_qty,Product_Price,Subtotal) VALUES('${Order_id}','${Product_id}','${Product_qty}','${Product_Price}','${Subtotal}')`, (error, result) => {
                if (error) throw error;
                res.send(result);
              }
            );
          };
        
          exports.update_order = async (req, res) => {
            const { Order_Total} = req.body;
            const { id } = req.params;
            console.log(`UPDATE orders SET Order_Total='${Order_Total}' where Order_id=${id}`)
            connection.query(
              `UPDATE orders SET Order_Total='${Order_Total}' where Order_id=${id}`,
              (error, result) => {
                if (error) throw error;
                res.send(result);
              }
            );
        
          };
        
        
