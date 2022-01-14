"use strict";

// function to convert one coffee object from array to html format
function renderCoffee(coffee) {
	let html = '<div class="coffee">';
	html += '<div class="coffee-id">' + coffee.id + '</div>';
	html += '<h3>' + coffee.name + '</h3>';
	html += '<p>' + coffee.roast + '</p>';
	html += '</div>';
	return html;
}

// function to convert coffee objects to html by calling renderCoffee function
function renderCoffees(coffees) {
	let html = '';
	for (let i = 0; i < coffees.length; i++) {
		html += renderCoffee(coffees[i]);
	}
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
		if (selectedRoast === "all roasts") {
			filteredCoffees.push(coffee);
		}
	});
	tbody.innerHTML = renderCoffees(filteredCoffees);
}

// array of coffee objects
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
	{id: 1, name: 'Light City', roast: 'light'},
	{id: 2, name: 'Half City', roast: 'light'},
	{id: 3, name: 'Cinnamon', roast: 'light'},
	{id: 4, name: 'City', roast: 'medium'},
	{id: 5, name: 'American', roast: 'medium'},
	{id: 6, name: 'Breakfast', roast: 'medium'},
	{id: 7, name: 'High', roast: 'dark'},
	{id: 8, name: 'Continental', roast: 'dark'},
	{id: 9, name: 'New Orleans', roast: 'dark'},
	{id: 10, name: 'European', roast: 'dark'},
	{id: 11, name: 'Espresso', roast: 'dark'},
	{id: 12, name: 'Viennese', roast: 'dark'},
	{id: 13, name: 'Italian', roast: 'dark'},
	{id: 14, name: 'French', roast: 'dark'},
];
// listener for updating the displayed coffees based on user's search input
document.getElementById("coffeeSearch").addEventListener("keyup", function () {
	let userSearch = document.getElementById("coffeeSearch").value.toUpperCase();
	let filteredCoffees = [];
	for (let i = 0; i < coffees.length; i++) {
		if (coffees[i].name.toUpperCase().includes(userSearch)) {
			filteredCoffees.push(coffees[i]);
		}
	}
	tbody.innerHTML = renderCoffees(filteredCoffees);
});
// listener for updating the displayed coffees based on user's roast selection by calling updateCoffees function
document.getElementById("roast-selection").addEventListener("change", updateCoffees);
// listener for adding a new coffee object to the coffees array
document.getElementById("submit").addEventListener('click', function (e) {
	e.preventDefault();
	if (document.getElementById("newCoffee").value === "") {
		alert("Please name your coffee!");
	} else {
		coffees.push(
			{
				id: coffees.length + 1,
				name: document.getElementById("newCoffee").value,
				roast: document.getElementById("addRoast").value
			}
		)
		document.getElementById("newCoffee").value = "";
		updateCoffees(e);
	}
});
// variable to identify html element that will be changed by listeners
let tbody = document.querySelector('#coffees');
// creates the initial displayed coffees on page load by calling the renderCoffees function
tbody.innerHTML = renderCoffees(coffees);