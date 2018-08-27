# Bamazon Customer

A shopping application made through node javascript, and the SQL database. Once you run the application, the following will happen:

- It will print the products in the store with their price.

- Customer will be prompted to choose which product they would like to purchase by ID number.

- It will ask the customer the quantity they want to buy. 

- If there is a sufficient amount of the product in stock, it will congratulate the customer on his purchase and tell him the total cost. However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.

- If the purchase goes through, it will update the stock quantity to reflect the purchase. It will update it in the table in the database.

- Once the customer makes his transaction, the application will start all over again. The customer can quit at any point.


Bamazon Manager

Starts with a menu:

- View Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product
- End Application

If the manager selects View Products for Sale, it lists all of the products in the store including all of their details.

If the manager selects View Low Inventory, it'll list all the products with less than five items in its StockQuantity column.

If the manager selects Add to Inventory, it allows the manager to select a product and add inventory.

If the manager selects Add New Product, it allows the manager to add a new product to the store. It gets added to our database.

If the manager selects End Application, it ends the session.

#### Technologies used:

* Node.js
* MySQL
* Inquirer.js

### This is a command line application. To run it:

Clone it on to your computer

Run ```npm install```
Then simply run ```node index.js```

Enjoy!
