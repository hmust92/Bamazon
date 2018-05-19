drop database if exists bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (100) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hot Cheetos", "Snacks", 2.50, 150),
("Doritos", "Snacks", 2.50, 150),
("Kraft Macaroni and Cheese Dinner, Three Cheese, 7.25 Ounce Box (Pack of 8 Boxes)", "Grocery", 7.50, 300),
("Kellogg's Pop-Tarts Frosted Toaster Pastries Variety Pack, Frosted Cherry, Blueberry and Strawberry, 12 Count", "Grocery", 3.48, 200),
("Chobani, Plain Non-Fat Greek Yogurt, 32oz", "Grocery", 5.49, 100),
("Driscoll's Strawberries", "Fruits", 3.99, 300),
("Apple iPad with WiFi, 32GB, Gold (2017 Model)", "Electronics", 292.99, 30),
("FIFA 18", "Video Games", 50.00, 300),
("Acer Aspire R 15", "Computers", 700.00, 20),
("Converse Chuck Taylor All Star Core Ox", "Shoes", 52.02, 10);


Select * from products;