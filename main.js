"use strict";

// function to convert one coffee object from array to html format
function renderCoffee(coffee) {
	let html = '<div class="coffee">';
	html += '<div class="coffee-id">' + coffee.id + '</div>';
	html += '<h3>' + coffee.name + '</h3>';
	html += '<p class="roast">' + coffee.roast + '</p>';
	html += '</div>';
	return html;
}

// function to convert coffee objects to html by calling renderCoffee function
function renderCoffees(coffees) {
	let html = '';
	coffees.forEach(function (coffee) {
		html += renderCoffee(coffee);
	});
	return html;
}

// function to change the coffees displayed in html based on user's roast selection
function updateCoffees(e) {
	e.preventDefault(); // don't submit the form, we just want to update the data
	let selectedRoast = document.querySelector('#roast-selection').value;
	let filteredCoffees = [];
	coffees.forEach(function (coffee) {
		if (coffee.roast === selectedRoast) {
			filteredCoffees.push(coffee);
		}
		if (selectedRoast === "(all roasts)") {
			filteredCoffees.push(coffee);
		}
	});
	tbody.innerHTML = renderCoffees(filteredCoffees);
}

// array of coffee objects
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
	{id: 1, name: 'Light City', roast: '(light roast)'},
	{id: 2, name: 'Half City', roast: '(light roast)'},
	{id: 3, name: 'Cinnamon', roast: '(light roast)'},
	{id: 4, name: 'City', roast: '(medium roast)'},
	{id: 5, name: 'American', roast: '(medium roast)'},
	{id: 6, name: 'Breakfast', roast: '(medium roast)'},
	{id: 7, name: 'High', roast: '(dark roast)'},
	{id: 8, name: 'Continental', roast: '(dark roast)'},
	{id: 9, name: 'New Orleans', roast: '(dark roast)'},
	{id: 10, name: 'European', roast: '(dark roast)'},
	{id: 11, name: 'Espresso', roast: '(dark roast)'},
	{id: 12, name: 'Viennese', roast: '(dark roast)'},
	{id: 13, name: 'Italian', roast: '(dark roast)'},
	{id: 14, name: 'French', roast: '(dark roast)'},
];
// store coffee array in localStorage
if (localStorage.getItem("coffees") === null) {
	localStorage.setItem("coffees", JSON.stringify(coffees));
} else {
	coffees = JSON.parse(localStorage.getItem("coffees"));
}
// listener for updating the displayed coffees based on user's search input
document.getElementById("coffeeSearch").addEventListener("keyup", function () {
	let userSearch = document.getElementById("coffeeSearch").value.toUpperCase();
	let filteredCoffees = [];
	coffees.forEach(function (coffee) {
		if (coffee.name.toUpperCase().includes(userSearch)) {
			filteredCoffees.push(coffee);
		}
	});
	tbody.innerHTML = renderCoffees(filteredCoffees);
});
// listener for updating the displayed coffees based on user's roast selection by calling updateCoffees function
document.getElementById("roast-selection").addEventListener("change", updateCoffees);
// listener for adding a new coffee object to the coffees array
document.getElementById("addCoffeeButton").addEventListener('click', function (e) {
	e.preventDefault();
	let newCoffeeName = document.getElementById("newCoffee").value;
	if (newCoffeeName === "") {
		alert("Please name your coffee!");
	} else {
		coffees.push(
			{
				id: coffees.length + 1,
				name: newCoffeeName,
				roast: document.getElementById("addRoast").value
			}
		)
		localStorage.setItem("coffees", JSON.stringify(coffees));
		document.getElementById("newCoffee").value = "";
		updateCoffees(e);
	}
});
// variable to identify html element that will be changed by listeners
let tbody = document.querySelector('#coffees');
// creates the initial displayed coffees on page load by calling the renderCoffees function
tbody.innerHTML = renderCoffees(coffees);