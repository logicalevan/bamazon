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
  manager();
});

function manager() {
  inquirer.prompt([{
    type: 'list',
    name: 'options',
    message: 'What do you want to do?',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
  }]).then(function(mngr) {
    // use switch case
    switch (mngr.options) {
      case 'View Products for Sale':
        showProducts();
        break;
      case 'View Low Inventory':
        lowInventory();
        break;
      case 'Add to Inventory':
        addInventory();
        break;
      case 'Add New Product':
        addProduct();
        break;
    };
  })
};

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
    console.log("\n" + table.toString());
    manager();
  });
};

function lowInventory() {
  var table = new Table({
    head: ['item id', 'Product Name', 'Department', 'Price', 'Quantity']
  });
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    manager();
  });
};

function addInventory() {
  inquirer.prompt([{
      name: 'id',
      message: 'What is the id of the item you want to update?'
    },
    {
      name: 'amount',
      message: 'How much do you want to add?'
    }
  ]).then(function(update) {
    connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [update.id], function(err, res) {
      // console.log(res[0].stock_quantity, update.amount);
      connection.query("UPDATE products SET ? WHERE ?", [{
          stock_quantity: res[0].stock_quantity + parseInt(update.amount)
        },
        {
          item_id: update.id
        }
      ], function(err, res) {
        if (err) {
          console.log(err)
        }
        console.log("The quantity has been updated.");
        manager();
      });
    });
  });
};

function addProduct() {
  inquirer.prompt([{
      name: 'id',
      message: 'What is the id of the item?'
    },
    {
      name: 'name',
      message: 'What is the name of the item?'
    },
    {
      name: 'department',
      message: 'What is the department the item belongs to?'
    },
    {
      name: 'price',
      message: 'What is the price?'
    },
    {
      name: 'stock',
      message: 'How much of this item do you want to add?'
    }
  ]).then(function(add) {
    connection.query("INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?, ?)", [add.id, add.name, add.department, add.price, add.stock], function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("Product has been added.");
      }
      manager();
    });
  });
};
