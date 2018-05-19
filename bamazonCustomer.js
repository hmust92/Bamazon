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

	main();

});

function main () {

	connection.query("SELECT * FROM products", function (err, result, fields) {

		if (err) throw err;
	
		displayTable(result);

		program(result);

	});

}

function displayTable(result) {


		var table = new Table({
			head: ['Item ID', 'Product', 'Department', 'Price ($)'],
			colWidths: [20, 111, 20, 20]
		});



		for (var i=0; i<result.length; i++) {

			table.push(
			[result[i].item_id, result[i].product_name, result[i].department_name, result[i].price.toFixed(2)]
			);	

		}

		console.log(table.toString());
}

function program (result) {

			//----------------inquirer objects-----------------//

		var initialQuestion = [
			{
				type:'input',
				name: 'itemid',
				message:"What is the Item ID of the product you'd like to buy?"
			},
			{
				type:'input',
				name: 'units',
				message:"How many units do you want to buy? Press q to quit."
			}
		]

		//---------------inqurirer object end---------------//

		inquirer.prompt(initialQuestion).then(function(answers) {


			if (answers.units === 'q'){
				console.log("Goodbye")
				connection.end();
				process.exit(0);

			}


			if (answers.units > result[answers.itemid].stock_quantity ) {

				console.log("Sorry, we do not have that many units in our stock. If you want, you can order a lower number of items or try ordering something else. \n")
				main();
			}

			else {

				console.log(`Congratulations. You have purchased ${answers.units} units of ${result[answers.itemid-1].product_name}`)
				var cost = result[answers.itemid-1].price.toFixed(2) * answers.units;
				console.log(`Your cost total is $${cost.toFixed(2)} \n`)
				var stock = result[answers.itemid-1].stock_quantity;
				var stockremaining = stock - answers.units;
				

				var itemUserPicked = answers.itemid;

				connection.query(
				"UPDATE products SET ? WHERE ?",
				[
					{
						stock_quantity: stockremaining
					},
					{
						item_id: itemUserPicked				
					}
				],
				function(err, res) {
				

					main();
				});

			}	



		});
}