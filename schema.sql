DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  item_id VARCHAR(10) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('39a', 'New Balance', 'Clothing', 30.00, 100),
('93h', 'Ipod', 'Electronics', 400.00, 2000),
('02u', 'Black Hat', 'Clothing', 10.00, 50),
('93k', 'Wood Crate', 'Industrial', 12.00, 60),
('27w', 'raspberry pi', 'Electronics', 35.00, 400),
('43d', 'Basketball', 'Sports', 28.00, 70),
('28i', 'Hollywood Interiors', 'Books', 35.00, 400),
('29w', 'Grey Sweatshirt', 'Clothing', 100.00, 4000),
('44s', 'Rain Man', 'Movies', 5.00, 50),
('77w', 'A Beautiful Mind', 'Movies', 8.00, 90);
