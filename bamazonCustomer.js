require("dotenv").config();

var keys = require('./keys.js');
var mysql = require("mysql");
var Table = require('cli-table');
var inquirer = require('inquirer');

var password = keys.password.key;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: password,
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  showProducts();
});

function showProducts() {
  var table = new Table({
    head: ['item id', 'Product Name', 'Department', 'Price', 'Quantity']
  });

  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    buy();
  });
};

function buy() {
  inquirer.prompt([{
      name: 'itemID',
      message: 'What is the ID of the product you want to buy?'
    },
    {
      name: 'amount',
      message: 'How many do you want to buy?'
    }
  ]).then(function(buy) {
    connection.query("SELECT item_id, price, stock_quantity FROM products WHERE item_id = ?", [buy.itemID], function(err, res) {
      // console.log(res[0].price);
      if (res[0].stock_quantity < buy.amount) {
        console.log("Insufficient quantity!")
        connection.end();
      } else {
        var new_stock = res[0].stock_quantity - buy.amount;
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: new_stock
          },
          {
            item_id: buy.itemID
          }
        ], function(err2, res2) {
          var total = res[0].price * buy.amount;
          console.log(new_stock);
          console.log("Your total is: $", total)
        });
      }
    });
  });
};
