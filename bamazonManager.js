var mysql = require("mysql");
var inquirer = require("inquirer");
const Table = require('cli-table');

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "bamazon"
});

connection.connect(function(err) {

	if (err) throw err;


	startManager();

});

function startManager () {


	inquirer.prompt(
		[
			{
				type: "list",
				name: "menuQuestions",
				message: "Menu Options",
				choices: ["View Products for Sale",
				"View Low Inventory",
				"Add to Inventory",
				"Add New Product",
				"End Application"]
			}
		]).then(function (answers) {

			switch(answers.menuQuestions) {
				case "View Products for Sale":
				forSale();
				break;
				case "View Low Inventory":
				lowInventory();
				break;
				case "Add to Inventory":
				addInventory();
				break;
				case "Add New Product":
				console.log("add to product");
				addProduct();
				break;
				case "End Application":
				endApp();
				break;
			}

	});

}	

function endApp () {
	console.log("Goodbye!");
	process.exit(0);
}

function forSale () {

	connection.query("SELECT * FROM products", function (err, result, fields) {

		var table = new Table({
			head: ['Item ID', 'Product', 'Department', 'Price ($)', 'Stock'],
			colWidths: [20, 111, 20, 15, 9]
		});



		for (var i=0; i<result.length; i++) {

			table.push(
			[result[i].item_id, result[i].product_name, result[i].department_name, result[i].price.toFixed(2), result[i].stock_quantity]
			);	

		}

		console.log(table.toString());

		startManager();

	})	
}

function lowInventory() {

	connection.query("Select * from products where stock_quantity < 5", function (err, result, fields) {

		if (result.length > 0){

			var table = new Table({
				head: ['Item ID', 'Product', 'Department', 'Price ($)', 'Stock'],
				colWidths: [20, 111, 20, 15, 9]
			});


			for (var i=0; i<result.length; i++) {

				table.push(
				[result[i].item_id, result[i].product_name, result[i].department_name, result[i].price.toFixed(2), result[i].stock_quantity]
				);	

			}

			console.log(table.toString());

		}

		else {

			console.log("Your inventory is stacked. \n")
		}

		


	startManager();		

	})

}

function addInventory () {


	inquirer.prompt(
	[
		{
			type:'input',
			name: 'addInventory',
			message:"What is the Item ID of the product you'd like to add to?"
		},
		{
			type:'input',
			name: 'numberInventory',
			message:"How many do you want to add?"
		}

	]).then(function (answers) {

		connection.query("SELECT * FROM products", function (err, result, fields) {


			var IDuserPicked = answers.addInventory;
			var itemIDToAdd = answers.addInventory-1;
			var amountToAdd = answers.numberInventory;
			var finalAmount = result[itemIDToAdd].stock_quantity + parseInt(amountToAdd); 		

			connection.query("UPDATE products SET ? WHERE ?",
				[
					{
						stock_quantity: finalAmount
					},
					{
						item_id: IDuserPicked
					}
				],
				function (err, result, fields) {

					console.log("Item added! \n")

					startManager();	
			})

		})

	});

}

function addProduct () {

	inquirer.prompt(
		[
			{
				type: "input",
				name: "product_name",
				message: "What is the name of the product you want to add?"	
			},
			{
				type:'input',
				name: 'department_name',
				message:"What is department name of this new product?"
			},
			{
				type:'input',
				name: 'price',
				message:"What is price of this new product?"
			},
			{
				type:'input',
				name: 'stock_quantity',
				message:"How many units of the item do you want to add?"
			}
		]).then(function(answers){

			connection.query("INSERT INTO products SET ?", answers, function (error, results, fields) {
				if (error) throw error;

				console.log("Your product has been inserted.")

				startManager();
				
			});
		})
}